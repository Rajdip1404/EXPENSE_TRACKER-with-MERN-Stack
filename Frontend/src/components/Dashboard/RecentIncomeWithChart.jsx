import React, { useEffect, useState } from 'react'
import CustomPieChart from '../Charts/CustomPieChart'
// import { COLORS } from '../../utils/data'

const COLORS = [
    "#8e44ad",
    "#9b4eb4",
    "#ab55c6",
    "#bc5fd8",
    "#cd66e9",
    "#de70fb",
    "#e779fd",
    "#f687ff",
];

const RecentIncomeWithChart = ({data, totalIncome}) => {
    const [chartData, setChartData] = useState([]);

    const prepareCharData = () => {
        const dataArr = data.map((item) => ({
            name: item?.source,
            amount: item?.amount
        }));

        setChartData(dataArr);
    };

    useEffect(() => {
        prepareCharData();

        return () => {};
    }, [data]);



  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Last 60 Days Income</h5>
        </div>

        <CustomPieChart 
            data={chartData}
            label="Total Income"
            totalAmount={`$${totalIncome}`}
            colors={COLORS}
            showTextAnchor
        />
    </div>
  )
}

export default RecentIncomeWithChart