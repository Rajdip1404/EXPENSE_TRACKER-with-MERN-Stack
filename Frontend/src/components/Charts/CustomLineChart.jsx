import React from 'react'
import {
    XAxis,
    YAxis,
    LineChart,
    Line,
    Area, 
    AreaChart,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const CustomLineChart = ({data}) => {
  // console.log(data);
    const CustomTooltip = ({ active, payload }) => {
        if(active && payload && payload.length) {
            return (
              <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
                <p className="text-xs font-semibold text-purple-800 mb-1">
                  {payload[0].payload.category}
                </p>
                <p className="tet-sm text-gray-700">
                  Amount: <span className='text-sm font-medium text-gray-900'>${payload[0].payload.amount}</span>
                </p>
              </div>
            );
        }
    }
  return (
    <div className='bg-white'>
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#875cf5" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#875cf5" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid stroke='none'/>
                <XAxis dataKey="month" tick={{fontSize: 12, fill: "#555" }} stroke='none'/>
                <YAxis tick={{fontSize: 12, fill: "#555" }} stroke='none'/>
                <Tooltip content={<CustomTooltip />} />
                <Area type={"monotone"} dataKey="amount" stroke="#a072e3" fill="url(#colorGradient)" strokeWidth={3} dot={{r:3, fill: "#c4b5f5"}} />
            </AreaChart>
        </ResponsiveContainer>
    </div>
  )
}

export default CustomLineChart;

{/* <Area
  type={"monotone"}
  dataKey="amount"
  stroke="#875cf5"
  fill="url(#incomeGradient)"
  strokeWidth={3}
  dot={{ r: 3, fill: "#ab8df8" }}
/>; */}