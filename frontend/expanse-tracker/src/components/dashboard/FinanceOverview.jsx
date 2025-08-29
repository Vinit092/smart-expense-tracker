import React from 'react'
import CustomPieChart from '../charts/CustomPieChart';


const COLORS=['#875CF5','#FA2C37','#FF6900'];
const FinanceOverview = ({totalBalance, totalExpense, totalIncome}) => {

    const balanceData=[
        {name: 'Total Balance', amount: totalBalance},
        {name: 'Total Expenses', amount: totalExpense},
        {name: 'Total Income', amount: totalIncome},
    ];
  return (
    <div className='card card-balance-main'>
     <div className='flex items-center justify-between'>
        <h5 className='text-lg text-shadow-lg'>Finance Overview</h5>
     </div>

     <CustomPieChart
     data={balanceData}
     label='Total Balance'
     totalAmount={`₹${totalBalance}`}
     colors={COLORS}
     showTextAnchor
     />
        
    </div>
  )
}

export default FinanceOverview
