import React, { useEffect, useState } from 'react'
import { prepareIncomeBarCharData } from '../../utils/helper';
import { LuPlus } from 'react-icons/lu';
import CustomBarChart from '../charts/CustomBarChart';

const IncomeOverview = ({transactions, onAddIncome, className}) => {
    const [chartData,setChartData]=useState([]);

    useEffect(()=>{
        const result= prepareIncomeBarCharData(transactions);
        setChartData(result)
    },[transactions]);

  return (
    <>
     <div className={`card ${className}`}>
        <div className='flex items-center justify-between'>
            <div className=''>
                <h5 className='text-lg'>Income Overview</h5>
                <p className='text-xs text-gray-400 mt-0.5'>
                    Track your earnings over time and analyze your income trends.
                </p>
            </div>

            <button className='add-btn drop-shadow-lg' onClick={onAddIncome}>
                <LuPlus className='text-lg'/>
                Add Income
            </button>
        </div>
    <div className='mt-10'>
        <CustomBarChart
        data={chartData}
        className={className}
        />
    </div>
     </div> 
    </>
  )
}

export default IncomeOverview
