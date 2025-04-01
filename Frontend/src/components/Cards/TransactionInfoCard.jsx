import React from 'react'
import { LuUtensils, LuTrendingUp, LuTrendingDown, LuTrash2 } from 'react-icons/lu'

const TransactionInfoCard = ({title, icon, date, amount, type, color, hideDeleteBtn, onDelete}) => {
  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6" />
        ) : (
          <LuUtensils />
        )}
      </div>
      <div className="flex-1 flex items-center justify-between">
        <div>
          <h6 className="text-sm text-gray-700 font-medium">{title}</h6>
          <p className="text-xs text-gray-500 mt-1">{date}</p>
        </div>
        <div className="flex items-center gap-2">
          {!hideDeleteBtn && (
            <button className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={onDelete}>
              <LuTrash2 size={20} className="text-xl text-red-500" />
            </button>
          )}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${color}`}>
            <h6 className={`text-sm font-semibold`}>
              {type === "income" ? "+" : "-"} ${amount}
            </h6>
            <h6>{type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionInfoCard