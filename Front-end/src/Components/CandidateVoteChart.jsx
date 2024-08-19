import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#FFC658",
  "#8DD1E1",
];

const CandidateVoteChart = ({ listsData }) => {
  const [activeList, setActiveList] = useState(listsData[0]?.list_name);

  const data =
    listsData
      .find((list) => list.list_name === activeList)
      ?.candidates.map((candidate) => ({
        name: candidate.name,
        value: candidate.vote_count,
      })) || [];

  return (
    <div className="w-full h-96 p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        توزيع الأصوات بين المرشحين
      </h2>
      <div className="mb-4">
        <label
          htmlFor="listSelect"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          اختر القائمة:
        </label>
        <select
          id="listSelect"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={activeList}
          onChange={(e) => setActiveList(e.target.value)}
        >
          {listsData.map((list, index) => (
            <option key={index} value={list.list_name}>
              {list.list_name}
            </option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            animationBegin={0}
            animationDuration={1500}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="vertical" align="right" verticalAlign="middle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CandidateVoteChart;
