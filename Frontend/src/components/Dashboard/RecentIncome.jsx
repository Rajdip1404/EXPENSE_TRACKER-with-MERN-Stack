import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

import moment from "moment";

const RecentIncome = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Recent Income</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.source}
            icon={item.icon}
            date={moment(item.date).format("DD MMM YYYY")}
            amount={item.amount}
            type="income"
            color="bg-green-50 text-green-600 p-1 rounded-lg"
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentIncome;
