import React from "react";
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

const DistrictVoteChart = ({ listsData }) => {
  const data = listsData.map((item) => ({
    name: item.list_name,
    votes: item.vote_count,
    seats: item.final_seats,
  }));

  return (
    <div className="w-full h-96 p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        أصوات وتوزيع المقاعد للقوائم
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            interval={0}
            height={70}
          />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="votes"
            fill="#8884d8"
            name="الأصوات"
            animationBegin={0}
            animationDuration={1500}
          />
          <Bar
            yAxisId="right"
            dataKey="seats"
            fill="#82ca9d"
            name="المقاعد"
            animationBegin={500}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DistrictVoteChart;
