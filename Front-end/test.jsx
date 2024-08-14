import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Sector,
} from "recharts";
import { ChevronDown } from "lucide-react";

// Mock data - replace with actual data from your backend
const listData = [
  { name: "قائمة 1", votes: 1500 },
  { name: "قائمة 2", votes: 1200 },
  { name: "قائمة 3", votes: 1000 },
];

const candidateData = {
  "قائمة 1": [
    { name: "مرشح 1", votes: 300 },
    { name: "مرشح 2", votes: 250 },
    { name: "مرشح 3", votes: 200 },
    { name: "مرشح 4", votes: 180 },
    { name: "مرشح 5", votes: 150 },
    { name: "مرشح 6", votes: 120 },
    { name: "مرشح 7", votes: 100 },
  ],
  "قائمة 2": [
    { name: "مرشح أ", votes: 280 },
    { name: "مرشح ب", votes: 260 },
    { name: "مرشح ج", votes: 220 },
    { name: "مرشح د", votes: 190 },
    { name: "مرشح ه", votes: 160 },
    { name: "مرشح و", votes: 130 },
    { name: "مرشح ز", votes: 110 },
  ],
  "قائمة 3": [
    { name: "مرشح X", votes: 270 },
    { name: "مرشح Y", votes: 240 },
    { name: "مرشح Z", votes: 210 },
    { name: "مرشح W", votes: 185 },
    { name: "مرشح V", votes: 155 },
    { name: "مرشح U", votes: 125 },
    { name: "مرشح T", votes: 105 },
  ],
};

// Updated color palette
const COLORS = [
  "#3498db", // Blue
  "#e74c3c", // Red
  "#2ecc71", // Green
  "#f39c12", // Orange
  "#9b59b6", // Purple
  "#1abc9c", // Turquoise
  "#34495e", // Dark Blue
];

const renderActiveShape = (props) => {
  // ... (rest of the renderActiveShape function remains the same)
};

const ElectionCharts = () => {
  const [selectedList, setSelectedList] = useState("قائمة 1");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <div
      className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg"
      dir="rtl"
    >
      <h2 className="text-3xl font-bold mb-8 text-right text-gray-800">
        نتائج الانتخابات
      </h2>

      {/* Updated Chart for comparing votes between lists */}
      <div className="mb-12 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-6 text-right text-gray-700">
          مقارنة الأصوات بين القوائم
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={listData}
            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              stroke="#888"
              tickLine={false}
              axisLine={{ stroke: "#888" }}
            />
            <YAxis
              stroke="#888"
              tickLine={false}
              axisLine={{ stroke: "#888" }}
              label={{
                value: "أصوات المنتخبين",
                angle: -90,
                position: "insideLeft",
                fill: "#888",
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            />
            <Bar
              dataKey="votes"
              fill={COLORS[0]}
              radius={[4, 4, 0, 0]}
              barSize={60}
            >
              {listData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart for comparing votes between candidates */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-6 text-right text-gray-700">
          مقارنة الأصوات بين المرشحين
        </h3>
        <div className="mb-6 relative w-64">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-4 py-2 text-right bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md flex items-center justify-between"
          >
            <span>{selectedList}</span>
            <ChevronDown className="h-5 w-5 text-gray-500" />
          </button>
          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
              {Object.keys(candidateData).map((list) => (
                <button
                  key={list}
                  className="block w-full px-4 py-2 text-right text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                  onClick={() => {
                    setSelectedList(list);
                    setIsOpen(false);
                  }}
                >
                  {list}
                </button>
              ))}
            </div>
          )}
        </div>
        <h4 className="text-xl font-medium mb-4 text-center text-gray-600">
          {`مرشحو ${selectedList}`}
        </h4>
        <ResponsiveContainer width="100%" height={500}>
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={candidateData[selectedList]}
              cx="50%"
              cy="50%"
              innerRadius={100}
              outerRadius={160}
              fill="#8884d8"
              dataKey="votes"
              onMouseEnter={onPieEnter}
              paddingAngle={3}
            >
              {candidateData[selectedList].map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ElectionCharts;
