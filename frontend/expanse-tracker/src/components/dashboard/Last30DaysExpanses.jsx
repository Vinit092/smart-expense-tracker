import React, { useEffect, useState } from 'react'
import { prepareExpenseBarCharData } from '../../utils/helper.js';
import CustomBarChart from '../charts/CustomBarChart.jsx';

function Last30DaysExpanses({data, className}) {

    const [chartData,setChartData]=useState([]);

    useEffect(()=>{
        const result= prepareExpenseBarCharData(data);
        setChartData(result);
    },[data]);

  return (
    <>
     <div className={`card col-span-1 ${className}`}>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg text-shadow-lg'>Last 30 Days Expenses</h5>
        </div>
        <CustomBarChart 
        data={chartData}
        className={className}
        />
     </div> 
    </>
  )
}

export default Last30DaysExpanses
