import React, { useState, useCallback } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Sector,
} from "recharts";
import { motion } from "framer-motion";

const COLORS = [
  "#4F46E5",
  "#34D399",
  "#F59E0B",
  "#F87171",
  "#A855F7",
  "#EC4899",
  "#3B82F6",
  "#14B8A6",
];

const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin((-midAngle * Math.PI) / 180);
  const cos = Math.cos((-midAngle * Math.PI) / 180);
  const sx = cx + (outerRadius + 12) * cos;
  const sy = cy + (outerRadius + 12) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 12}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={4} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
        fontSize={14}
        fontWeight={600}
      >
        {payload.name}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#666"
        fontSize={12}
      >
        {`${value} صوت (${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const CustomTooltip = ({ payload, label, active }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4">
        <p className="text-lg font-semibold">{payload[0].name}</p>
        <p className="text-sm text-gray-600">{`${payload[0].value} صوت`}</p>
        <p className="text-sm text-gray-500">{`${(
          payload[0].percent * 100
        ).toFixed(2)}%`}</p>
      </div>
    );
  }

  return null;
};

const CandidateVoteChart = ({ listsData }) => {
  const [activeList, setActiveList] = useState(listsData[0]?.list_name);
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const data =
    listsData
      .find((list) => list.list_name === activeList)
      ?.candidates.map((candidate) => ({
        name: candidate.name,
        value: candidate.vote_count,
      })) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[600px] p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-xl"
    >
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
        توزيع الأصوات بين المرشحين
      </h2>
      <div className="mb-6">
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
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
            animationBegin={0}
            animationDuration={1000}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default CandidateVoteChart;
