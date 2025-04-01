import React, { useState, useEffect } from 'react'
import { LuPlus } from 'react-icons/lu'
import { prepareExpenseLineChartData } from '../../utils/helper';
import CustomLineChart from '../Charts/CustomLineChart';

const ExpenseOverview = ({transactions, onAddExpense}) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseLineChartData(transactions);
        setChartData(result);
        return () => {};
    }, [transactions]);

  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <div>
                <h5 className='text-lg'>Expense Overview</h5>
                <p className='text-xs text-gray-500 mt-0.5'>Track your expenses over time and analyze your spending patterns.</p>
            </div>
            <button className='add-btn' onClick={onAddExpense}>
                <LuPlus className='text-lg' />
                Add Expense
            </button>
        </div>
        <div className='mt-10'>
            <CustomLineChart 
                data={chartData}
            />
        </div>
    </div>
  )
}

export default ExpenseOverview