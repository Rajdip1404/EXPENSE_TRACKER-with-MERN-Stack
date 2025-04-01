import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const IncomeList = ({transactions, onDelete, onDownload}) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Income Sources</h5>
            <button className='card-btn' onClick={onDownload}>
                <LuDownload className='text-base' /> Download
            </button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2'>

            {transactions?.map((item) => (
                <TransactionInfoCard
                    key={item._id}
                    title={item.source}
                    icon={item.icon}
                    date={moment(item.date).format("DD MMM YYYY")}
                    amount={item.amount}
                    type="income"
                    color="bg-green-50 text-green-600 p-1 rounded-lg"
                    onDelete={() => onDelete(item._id)}
                />
            ))}

        </div>
    </div>
  )
}

export default IncomeList