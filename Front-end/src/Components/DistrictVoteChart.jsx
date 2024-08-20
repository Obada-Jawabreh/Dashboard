import React, { useState, useEffect } from "react";
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

const DistrictVoteChart = ({ listsData }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const processedData = listsData.map((item) => ({
      name: item.list_name,
      votes: item.vote_count,
      seats: item.final_seats,
    }));
    setData(processedData);
  }, [listsData]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[600px] p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-2xl"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        أصوات وتوزيع المقاعد للقوائم
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={data}
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
  );
};

export default DistrictVoteChart;
