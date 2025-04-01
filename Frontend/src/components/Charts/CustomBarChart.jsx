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
  Cell,
} from "recharts";

const CustomBarChart = ({data}) => {
  const getBarColor = (index) => {
    const colors = [
      "#4682B4",
      "#6495ED",
      "#7A00E6",
      "#8B00FF",
      "#A200FF",
      "#B300FF",
      "#C500FF",
      "#D800FF",
      "#E500FF",
    ];
    return colors[index % colors.length];
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      // console.log(payload)
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p
            className={`text-xs font-semibold bg-blend-soft-light text-purple-600 mb-1`}
          >
            {payload[0].payload.category}
          </p>
          <p className="tet-sm text-gray-700">
            Amount :{" "}
            <span className="text-sm font-medium text-gray-900">
              ${payload[0].payload.amount}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid stroke="none" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#555" }} />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <Tooltip content={CustomTooltip} />
          <Bar
            dataKey="amount"
            fill="#8884d8"
            radius={[10, 10, 0, 0]}
            activeDot={{ r: 8, fill: "yellow" }}
            activeStyle={{ fill: "green" }}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
