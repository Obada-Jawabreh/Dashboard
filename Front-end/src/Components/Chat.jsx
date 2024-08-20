import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import bg from "./../assets/images/BG.jpg";
const Chat = () => {
  const [nationalIds, setNationalIds] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userMessages, setUserMessages] = useState([]);
  const [scrollToBottom, setScrollToBottom] = useState(false);
  const [sendMessages, setSendMessages] = useState({
    Message: "",
    national_id: "",
  });

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  // -----------------------------------------fetchNationalIds------------------------------------------
  useEffect(() => {
    const fetchNationalIds = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/chat/national-Id"
        );
        setNationalIds(response.data);
      } catch (error) {
        console.error("Error fetching national IDs:", error);
      }
    };

    fetchNationalIds();
  }, []);
  // -----------------------------------------fetchMessages------------------------------------------

  useEffect(() => {
    const fetchMessages = async () => {
      const allMessages = [];
      for (const nationalIdObj of nationalIds) {
        const nationalId = nationalIdObj.national_id;
        try {
          const response = await axios.get(
            `http://localhost:5000/api/chat/chat/${nationalId}`
          );
          allMessages.push({ nationalId, messages: response.data });
        } catch (error) {
          console.error(`Error fetching messages for ${nationalId}:`, error);
        }
      }
      setMessages(allMessages);
    };

    if (nationalIds.length > 0) {
      fetchMessages();
    }
  }, [nationalIds]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedUser) {
        fetchUserMessages(selectedUser.nationalId);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedUser]);
  // -----------------------------------------fetchUserMessages------------------------------------------

  const fetchUserMessages = async (nationalId, scroll = false) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/chat/chat/${nationalId}`
      );
      const sortedMessages = response.data.sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );
      setUserMessages(sortedMessages);
      if (scroll) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error(`Error fetching messages for ${nationalId}:`, error);
    }
  };
  // -----------------------------------------------------------------------------------

  const handleUserClick = (user) => {
    setSelectedUser(user);
    fetchUserMessages(user.nationalId, false);
    setSendMessages((prev) => ({ ...prev, national_id: user.nationalId }));
  };
  // --------------------------------------AddMessage---------------------------------------------

  const AddMessage = async () => {
    try {
      await axios.post("http://localhost:5000/api/chat/chat", sendMessages);
      setSendMessages({
        Message: "",
        national_id: selectedUser?.nationalId || "",
      });
      fetchUserMessages(selectedUser?.nationalId, true); // التمرير لأسفل بعد إرسال الرسالة
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  return (
    <div className="flex h-screen bg-gray-100 flex-row-reverse">
      <div className="w-1/3 border-r border-gray-300 p-4">
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="بحث"
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
          <button className="bg-green-500 text-white rounded-full p-2 ml-2">
            +
          </button>
        </div>
        <h2 className="text-lg font-semibold mb-2">المحادثات</h2>
        <div className="space-y-2">
          {messages.length > 0 ? (
            messages.map((user, index) => (
              <div
                key={index}
                className="p-2 bg-gray-200 rounded-lg cursor-pointer"
                onClick={() => handleUserClick(user)}
              >
                <span className="font-semibold">{user.messages[0]?.name}</span>
                <span className="text-gray-500 block text-sm">
                  {user.messages[0]?.Message}
                </span>
              </div>
            ))
          ) : (
            <div className="p-2 bg-gray-200 rounded-lg">
              <span className="text-gray-500">لا توجد رسائل حالياً.</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 p-4">
        {selectedUser ? (
          <>
            <div className="flex items-center mb-4">
              <div className="bg-lime-50 w-full flex-col content-center h-12">
                <div className="flex justify-end px-6">
                  <span className="text-xl font-semibold">
                    {selectedUser.messages[0]?.name}
                  </span>
                </div>
              </div>
            </div>

            <div
              className="space-y-4 h-[calc(100vh-200px)] overflow-y-auto"
              ref={messagesContainerRef}
            >
               {/* <div  style={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: "cover",
                    height:"100%"
                  }}> */}
                  
              {userMessages.length > 0 ? (
                userMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.admin ? "justify-end" : "justify-start"
                    } mb-2`}
                  >
                    <div
                      className={`${
                        message.admin
                          ? "bg-gray-500 text-white"
                          : "bg-gray-200 text-black"
                      } p-2 rounded-lg`}
                    >
                      <span>{message.Message}</span>
                    </div>
                    <span className="text-gray-300 block text-sm ml-2">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center p-4">
                  <span className="text-gray-500">
                    لا توجد رسائل لهذا المستخدم.
                  </span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            {/* </div> */}
            <div className="mt-4">
              <input
                type="text"
                placeholder="اكتب رسالة هنا..."
                className="border border-gray-300 rounded-lg p-2 w-full"
                value={sendMessages.Message}
                onChange={(e) =>
                  setSendMessages({ ...sendMessages, Message: e.target.value })
                }
              />
              <button
                className="bg-gray-300 text-white rounded-full p-2 mt-2"
                onClick={AddMessage}
              >
                إرسال
              </button>
            </div>
          </>
        ) : (
          <div className="text-center p-4">
            <span className="text-gray-500">اختر مستخدمًا لعرض الرسائل.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;


// import React, { useState } from 'react';
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#8DD1E1'];

// const CandidateVoteChart = ({ listsData }) => {
//   const [activeList, setActiveList] = useState(listsData[0]?.list_name);

//   const data = listsData.find(list => list.list_name === activeList)?.candidates.map(candidate => ({
//     name: candidate.name,
//     value: candidate.vote_count
//   })) || [];

//   return (
//     <div className="w-full h-96 p-4 bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-4 text-center">توزيع الأصوات بين المرشحين</h2>
//       <div className="mb-4">
//         <label htmlFor="listSelect" className="block text-sm font-medium text-gray-700 mb-2">اختر القائمة:</label>
//         <select
//           id="listSelect"
//           className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
//           value={activeList}
//           onChange={(e) => setActiveList(e.target.value)}
//         >
//           {listsData.map((list, index) => (
//             <option key={index} value={list.list_name}>{list.list_name}</option>
//           ))}
//         </select>
//       </div>
//       <ResponsiveContainer width="100%" height="100%">
//         <PieChart>
//           <Pie
//             data={data}
//             cx="50%"
//             cy="50%"
//             labelLine={false}
//             outerRadius={80}
//             fill="#8884d8"
//             dataKey="value"
//             animationBegin={0}
//             animationDuration={1500}
//           >
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend layout="vertical" align="right" verticalAlign="middle" />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default CandidateVoteChart;
