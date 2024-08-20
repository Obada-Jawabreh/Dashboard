import React, { useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

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

  const chartData = listsData.map((item) => ({
    name: item.party_name,
    votes: item.vote_count,
    seats: item.final_seats,
  }));

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen rtl">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-black text-white p-6 text-center">
          <h1 className="text-3xl font-bold">عداد الأصوات للقوائم الحزبية</h1>
        </div>
        <div className="p-6">
          <button
            onClick={handleFetchData}
            className="mb-6 mr-3 inline-flex items-center px-4 py-2 border border-transparent text-base font-extrabold rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-300"
          >
            جلب بيانات الأصوات
          </button>

          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

          {listsData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative mt-8"
            >
              <div className="relative bg-transparent">
                <img
                  src="https://i.imgur.com/uLXe1US.png"
                  alt="Background"
                  className="absolute inset-0 w-full h-full object-fet opacity-80"
                />
                <div className="relative p-6 bg-gray-200 bg-opacity-50 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-100 rtl bg-transparent">
                    {" "}
                    <thead className="  text-white">
                      <tr>
                        <th className="px-6 py-3  text-center text-lg underline underline-offset-8 font-extrabold text-gray-900 uppercase tracking-wider">
                          عدد المقاعد النهائي
                        </th>
                        <th className="px-6 py-3 text-center text-base underline underline-offset-8 font-extrabold text-gray-900 uppercase tracking-wider">
                          الأرقام العشرية
                        </th>
                        <th className="px-6 py-3 text-center text-base underline underline-offset-8 font-extrabold text-gray-900 uppercase tracking-wider">
                          الأرقام الصحيحة الأولية
                        </th>
                        <th className="px-6 py-3 text-center text-base underline underline-offset-8 font-extrabold text-gray-900 uppercase tracking-wider">
                          الأصوات
                        </th>
                        <th className="px-6 py-3 text-center text-base underline underline-offset-8 font-extrabold text-gray-900 uppercase tracking-wider">
                          اسم القائمة
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-transparent divide-y divide-gray-100">
                      {listsData.map((item, index) => (
                        <tr
                          key={index}
                          className={`hover:bg-gray-50 ${
                            index % 2 === 0
                              ? "bg-gray-50 bg-transparent"
                              : "bg-white bg-transparent"
                          }`}
                        >
                          <td className="px-6 py-4 text-base text-gray-700 whitespace-nowrap text-center">
                            {item.final_seats}
                          </td>
                          <td className="px-6 py-4 text-base text-gray-700 whitespace-nowrap text-center">
                            {item.decimal_part.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 text-base text-gray-700 whitespace-nowrap text-center">
                            {item.initial_integer_part}
                          </td>
                          <td className="px-6 py-4 text-base text-gray-700 whitespace-nowrap text-center">
                            {item.vote_count}
                          </td>
                          <td className="px-6 py-4 text-base text-gray-700 whitespace-nowrap text-center">
                            {item.party_name}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {listsData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 w-full h-[600px] bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-2xl p-6"
            >
              <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                أصوات وتوزيع المقاعد للقوائم
              </h2>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    interval={0}
                    height={80}
                    tick={{ fill: "#4a5568", fontSize: 12 }}
                  />
                  <YAxis
                    yAxisId="left"
                    orientation="left"
                    stroke="#8884d8"
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#82ca9d"
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend wrapperStyle={{ paddingTop: "20px" }} />
                  <Bar
                    yAxisId="left"
                    dataKey="votes"
                    fill="#8884d8"
                    name="الأصوات"
                    animationBegin={0}
                    animationDuration={1500}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="seats"
                    fill="#82ca9d"
                    name="المقاعد"
                    animationBegin={500}
                    animationDuration={1500}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          )}

          {totalVoteCount !== null && (
            <div className="mt-8 bg-white rounded-lg p-6 shadow-md text-center">
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
