import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) => {
  return (
    <div className="flex flex-col items-center w-full">
      <ResponsiveContainer width="100%" minWidth={320} height={340}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="45%" // Moved chart up for more space
            outerRadius={130}
            innerRadius={95}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />}/>
          <Legend
            // content={<CustomLegend />}
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ marginTop: 20 }}
          />

          {showTextAnchor && (
            <>
              <text
                x="50%"
                y="50%"
                dy={-10}
                textAnchor="middle"
                fontSize="14px"
                fontWeight="bold"
                fill="#444"
              >
                {label}
              </text>
              <text
                x="50%"
                y="50%"
                dy={30}
                textAnchor="middle"
                fontSize="22px"
                fontWeight="bold"
                fill="#222"
              >
                {totalAmount}
              </text>
            </>
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
