import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#875CF5", "#2ECC71", "#FA2C37"]; // Updated colors

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Income", amount: totalIncome },
    { name: "Total Expenses", amount: totalExpense },
  ];

  return (
    <div className="bg-white shadow-md rounded-xl p-5 w-full max-w-full mx-auto">
      <h5 className="text-lg font-semibold text-gray-800 text-center mb-4 p-2">
        Financial Overview
      </h5>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`$${totalBalance}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
