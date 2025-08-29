import React, { useEffect, useState } from 'react'
import { prepareExpenseLineCharData } from '../../utils/helper.js';
import { LuPlus } from 'react-icons/lu';
import CustomLineChart from '../charts/CustomLineChart.jsx';

const ExpenseOverview = ({transactions, onExpenseIncome}) => {

    const [chartData,setChartData]=useState([]);

    useEffect(()=>{
        const result=prepareExpenseLineCharData(transactions);
        setChartData(result);
    },[transactions]);
  return (
    <>
     <div className='card card-expense-main'>
        <div className='flex items-center justify-between'>
            <div className=''>
                <h5 className='text-lg'>Expense Overview</h5>
                <p className='text-xs text-gray-400 mt-0.5'>Track your spending trends over time and gain insights into where your money goes.
                </p>
            </div>

            <button className='add-btn' onClick={onExpenseIncome}>
            <LuPlus className='text-lg'/>
            Add Expense
            </button>
        </div>

        <div className='mt-10'>
        <CustomLineChart data={chartData}/>
        </div>
     </div> 
    </>
  )
}

export default ExpenseOverview
