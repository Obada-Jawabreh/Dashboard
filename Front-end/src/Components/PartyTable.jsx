// import React, { useState } from "react";
// import axios from "axios";

// const PartyVoteTable = () => {
//   const [partyName, setPartyName] = useState("");
//   const [listsData, setListsData] = useState([]);
//   const [totalVoteCount, setTotalVoteCount] = useState(null);
//   const [numberOfSeats, setNumberOfSeats] = useState(49); // عدد المقاعد الثابت للقوائم الحزبية
//   const [threshold, setThreshold] = useState(null);
//   const [error, setError] = useState("");

//   const handleFetchData = async () => {
//     try {
//       // جلب إجمالي الأصوات لجميع القوائم الحزبية
//       const allPartiesResponse = await axios.get(
//         "http://localhost:5000/api/VoteCount/partyList/get-TotalVoteCountForAllPartyList"
//       );

//       const totalVotes = allPartiesResponse.data.total_votesForAllPartyList;
//       setTotalVoteCount(totalVotes);

//       // حساب العتبة
//       const thresholdValue = 0.025 * totalVotes; // 2.5% للقوائم الحزبية
//       setThreshold(thresholdValue);

//       // جلب بيانات جميع الأحزاب (نفترض وجود هذا الـ API)
//       const allPartiesDataResponse = await axios.get(
//         "http://localhost:5000/api/VoteCount/partyList/getAllPartiesData"
//       );

//       const partiesData = allPartiesDataResponse.data.parties;

//       // تصفية الأحزاب التي تتجاوز العتبة
//       const filteredParties = partiesData.map((party) => ({
//         ...party,
//         exceedsThreshold: party.vote_count >= thresholdValue,
//       }));

//       // حساب مجموع الأصوات التي تجاوزت العتبة
//       const totalVotesAboveThreshold = filteredParties
//         .filter((party) => party.exceedsThreshold)
//         .reduce((a, b) => a + b.vote_count, 0);

//       // حساب النتيجة لكل حزب
//       const results = filteredParties.map((party) =>
//         party.exceedsThreshold
//           ? (numberOfSeats / totalVotesAboveThreshold) * party.vote_count
//           : 0
//       );

//       // حساب الرقم الصحيح والرقم العشري لكل حزب
//       const initialIntegerParts = results.map((result) => Math.floor(result));
//       const decimalParts = results.map((result) => result - Math.floor(result));

//       // حساب المجموع الحالي للأجزاء الصحيحة
//       const totalInitialIntegerParts = initialIntegerParts.reduce(
//         (a, b) => a + b,
//         0
//       );

//       // عدد المقاعد المطلوب إضافته
//       const seatsNeeded = numberOfSeats - totalInitialIntegerParts;

//       // ترتيب الأرقام العشرية من الأعلى إلى الأدنى
//       const sortedDecimalParts = decimalParts
//         .map((decimal, index) => ({ decimal, index }))
//         .sort((a, b) => b.decimal - a.decimal);

//       // إضافة المقاعد بناءً على الأرقام العشرية
//       const finalSeats = [...initialIntegerParts];
//       for (let i = 0; i < seatsNeeded; i++) {
//         const highestDecimal = sortedDecimalParts[i];
//         if (highestDecimal) {
//           finalSeats[highestDecimal.index] += 1;
//         }
//       }

//       // إعداد البيانات النهائية
//       const finalData = filteredParties.map((party, index) => ({
//         party_name: party.party_name,
//         vote_count: party.vote_count,
//         initial_integer_part: party.exceedsThreshold
//           ? initialIntegerParts[index]
//           : 0,
//         decimal_part: party.exceedsThreshold ? decimalParts[index] : 0,
//         final_seats: party.exceedsThreshold ? finalSeats[index] : 0,
//         exceedsThreshold: party.exceedsThreshold,
//       }));

//       setListsData(finalData);
//       setError("");
//     } catch (err) {
//       setError("خطأ في جلب البيانات");
//       console.error("Error:", err);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 bg-gray-100 min-h-screen rtl">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="bg-black text-white p-6 text-right">
//           <h1 className="text-3xl font-bold">عداد الأصوات للقوائم الحزبية</h1>
//         </div>
//         <div className="p-6">
//           <div className="mb-6 flex items-center">
//             <button
//               onClick={handleFetchData}
//               className="mr-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
//             >
//               جلب بيانات الأصوات
//             </button>
//           </div>

//           {error && <p className="text-red-500 mt-4 text-right">{error}</p>}

//           {listsData.length > 0 && (
//             <div className="mt-8">
//               <h2 className="text-xl font-semibold mb-4 text-right">
//                 الأصوات لكل قائمة حزبية
//               </h2>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200 rtl">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         اسم الحزب
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         الأصوات
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         الأرقام الصحيحة الأولية
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         الأرقام العشرية
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         عدد المقاعد النهائي
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {listsData.map((item, index) => (
//                       <tr
//                         key={index}
//                         className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
//                         style={{
//                           backgroundColor: !item.exceedsThreshold ? "red" : "",
//                         }}
//                       >
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
//                           {item.party_name}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
//                           {item.vote_count}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
//                           {item.initial_integer_part}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
//                           {item.decimal_part.toFixed(2)}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
//                           {item.final_seats}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {(totalVoteCount !== null || numberOfSeats !== null) && (
//             <div className="mt-8 bg-white rounded-lg p-6 shadow-md text-right">
//               <h2 className="text-xl font-semibold mb-2">
//                 إجمالي الأصوات لجميع القوائم الحزبية
//               </h2>
//               <p className="text-3xl font-bold text-black">
//                 {totalVoteCount} (عدد مقاعد القوائم الحزبية: {numberOfSeats})
//               </p>
//               {threshold !== null && (
//                 <p className="text-lg text-gray-700 mt-4">
//                   قيمة العتبة: {threshold.toFixed(2)}
//                 </p>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PartyVoteTable;

// import React, { useState } from "react";
// import axios from "axios";

// const PartyVoteTable = () => {
//   const [partyName, setPartyName] = useState("");
//   const [listsData, setListsData] = useState([]);
//   const [totalVoteCount, setTotalVoteCount] = useState(null);
//   const [numberOfSeats, setNumberOfSeats] = useState(41); // عدد المقاعد الثابت للقوائم الحزبية
//   const [threshold, setThreshold] = useState(null);
//   const [error, setError] = useState("");

//   const handleFetchData = async () => {
//     try {
//       // جلب إجمالي الأصوات لجميع القوائم الحزبية
//       const allPartiesResponse = await axios.get(
//         "http://localhost:5000/api/VoteCount/partyList/get-TotalVoteCountForAllPartyList"
//       );

//       const totalVotes = allPartiesResponse.data.total_votesForAllPartyList;
//       setTotalVoteCount(totalVotes);

//       // حساب العتبة
//       const thresholdValue = 0.025 * totalVotes; // 2.5% للقوائم الحزبية
//       setThreshold(thresholdValue);

//       // جلب بيانات جميع الأحزاب (نفترض وجود هذا الـ API)
//       const allPartiesDataResponse = await axios.get(
//         "http://localhost:5000/api/VoteCount/partyList/get-TotalVoteCountForOnePartyList"
//         // http://localhost:5000/api/VoteCount/partyList/get-TotalVoteCountForOnePartyList?partyName=الشورى الأردني
//       );

//       const partiesData = allPartiesDataResponse.data.parties;

//       // تصفية الأحزاب التي تتجاوز العتبة
//       const filteredParties = partiesData.map((party) => ({
//         ...party,
//         exceedsThreshold: party.vote_count >= thresholdValue,
//       }));

//       // حساب مجموع الأصوات التي تجاوزت العتبة
//       const totalVotesAboveThreshold = filteredParties
//         .filter((party) => party.exceedsThreshold)
//         .reduce((a, b) => a + b.vote_count, 0);

//       // حساب النتيجة لكل حزب
//       const results = filteredParties.map((party) =>
//         party.exceedsThreshold
//           ? (numberOfSeats / totalVotesAboveThreshold) * party.vote_count
//           : 0
//       );

//       // حساب الرقم الصحيح والرقم العشري لكل حزب
//       const initialIntegerParts = results.map((result) => Math.floor(result));
//       const decimalParts = results.map((result) => result - Math.floor(result));

//       // حساب المجموع الحالي للأجزاء الصحيحة
//       const totalInitialIntegerParts = initialIntegerParts.reduce(
//         (a, b) => a + b,
//         0
//       );

//       // عدد المقاعد المطلوب إضافته
//       const seatsNeeded = numberOfSeats - totalInitialIntegerParts;

//       // ترتيب الأرقام العشرية من الأعلى إلى الأدنى
//       const sortedDecimalParts = decimalParts
//         .map((decimal, index) => ({ decimal, index }))
//         .sort((a, b) => b.decimal - a.decimal);

//       // إضافة المقاعد بناءً على الأرقام العشرية
//       const finalSeats = [...initialIntegerParts];
//       for (let i = 0; i < seatsNeeded; i++) {
//         const highestDecimal = sortedDecimalParts[i];
//         if (highestDecimal) {
//           finalSeats[highestDecimal.index] += 1;
//         }
//       }

//       // إعداد البيانات النهائية
//       const finalData = filteredParties.map((party, index) => ({
//         party_name: party.party_name,
//         vote_count: party.vote_count,
//         initial_integer_part: party.exceedsThreshold
//           ? initialIntegerParts[index]
//           : 0,
//         decimal_part: party.exceedsThreshold ? decimalParts[index] : 0,
//         final_seats: party.exceedsThreshold ? finalSeats[index] : 0,
//         exceedsThreshold: party.exceedsThreshold,
//       }));

//       setListsData(finalData);
//       setError("");
//     } catch (err) {
//       setError("خطأ في جلب البيانات");
//       if (err.response) {
//         console.error("Error response:", err.response);
//       } else if (err.request) {
//         console.error("Error request:", err.request);
//       } else {
//         console.error("Error message:", err.message);
//       }
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 bg-gray-100 min-h-screen rtl">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="bg-black text-white p-6 text-right">
//           <h1 className="text-3xl font-bold">عداد الأصوات للقوائم الحزبية</h1>
//         </div>
//         <div className="p-6">
//           <div className="mb-6 flex items-center">
//             <button
//               onClick={handleFetchData}
//               className="mr-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
//             >
//               جلب بيانات الأصوات
//             </button>
//           </div>

//           {error && <p className="text-red-500 mt-4 text-right">{error}</p>}

//           {listsData.length > 0 && (
//             <div className="mt-8">
//               <h2 className="text-xl font-semibold mb-4 text-right">
//                 الأصوات لكل قائمة حزبية
//               </h2>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200 rtl">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         اسم الحزب
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         الأصوات
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         الأرقام الصحيحة الأولية
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         الأرقام العشرية
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         عدد المقاعد النهائي
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {listsData.map((item, index) => (
//                       <tr
//                         key={index}
//                         className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
//                         style={{
//                           backgroundColor: !item.exceedsThreshold ? "red" : "",
//                         }}
//                       >
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
//                           {item.party_name}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
//                           {item.vote_count}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
//                           {item.initial_integer_part}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
//                           {item.decimal_part.toFixed(2)}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
//                           {item.final_seats}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {(totalVoteCount !== null || numberOfSeats !== null) && (
//             <div className="mt-8 bg-white rounded-lg p-6 shadow-md text-right">
//               <h2 className="text-xl font-semibold mb-2">
//                 إجمالي الأصوات لجميع القوائم الحزبية
//               </h2>
//               <p className="text-3xl font-bold text-black">
//                 {totalVoteCount} (عدد مقاعد القوائم الحزبية: {numberOfSeats})
//               </p>
//               {threshold !== null && (
//                 <p className="text-lg text-gray-700 mt-4">
//                   قيمة العتبة: {threshold.toFixed(2)}
//                 </p>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PartyVoteTable;

import React, { useState } from "react";
import axios from "axios";

const PartyTable = () => {
  const [listsData, setListsData] = useState([]);
  const [totalVoteCount, setTotalVoteCount] = useState(null);
  const [totalSeats, setTotalSeats] = useState(41);
  const [threshold, setThreshold] = useState(null);
  const [error, setError] = useState("");

  const handleFetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/VoteCount/partyList/getPartyListResults"
      );

      const {
        results,
        totalVotes,
        totalSeats,
        threshold: thresholdValue,
      } = response.data;

      setListsData(results);
      setTotalVoteCount(totalVotes);
      setTotalSeats(totalSeats);
      setThreshold(thresholdValue);
      setError("");
    } catch (err) {
      setError("خطأ في جلب البيانات");
      console.error("Error:", err);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen rtl">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-black text-white p-6 text-right">
          <h1 className="text-3xl font-bold">عداد الأصوات للقوائم الحزبية</h1>
        </div>
        <div className="p-6">
          <button
            onClick={handleFetchData}
            className="mb-6 mr-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            جلب بيانات الأصوات
          </button>

          {error && <p className="text-red-500 mt-4 text-right">{error}</p>}

          {listsData.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 text-right">
                نتائج القوائم الحزبية
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 rtl">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        اسم القائمة
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الأصوات
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الأرقام الصحيحة الأولية
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الأرقام العشرية
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        عدد المقاعد النهائي
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {listsData.map((item, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {item.party_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {item.vote_count}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {item.initial_integer_part}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {item.decimal_part.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {item.final_seats}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {totalVoteCount !== null && (
            <div className="mt-8 bg-white rounded-lg p-6 shadow-md text-right">
              <h2 className="text-xl font-semibold mb-2">
                إجمالي الأصوات لجميع القوائم الحزبية
              </h2>
              <p className="text-3xl font-bold text-black">
                {totalVoteCount} (عدد مقاعد القوائم الحزبية: {totalSeats})
              </p>
              {threshold !== null && (
                <p className="text-lg text-gray-700 mt-4">
                  قيمة العتبة: {threshold.toFixed(2)}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartyTable;
