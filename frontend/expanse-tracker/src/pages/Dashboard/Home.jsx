import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios.instance';
import { API_PATHS } from '../../utils/apiPaths';
import InfoCard from '../../components/cards/InfoCard';
import {IoMdCard} from 'react-icons/io'
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import { addThousandsSeparator } from '../../utils/helper.js';
import RecentTransactions from '../../components/dashboard/RecentTransactions.jsx';
import FinanceOverview from '../../components/dashboard/FinanceOverview.jsx';
import ExpenseTransactions from '../../components/dashboard/ExpenseTransactions.jsx';
import Last30DaysExpanses from '../../components/dashboard/last30DaysExpanses.jsx';
import RecentIncomeWithChart from '../../components/dashboard/RecentIncomeWithChart.jsx';
import RecentIncome from '../../components/dashboard/RecentIncome.jsx';
const Home = () => {
  useUserAuth(); 
   
  const navigate=useNavigate();

  const [dashboardData, setDashboardData]=useState(null);
  const [loading,setLoading]=useState(false);

  const fetchDashboardData= async ()=>{
    if(loading) return;

    setLoading(true);
    
    try {
      const response= await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if(response.data){
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log('Something went wrong. Please try again.',error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchDashboardData();
  },[])
  return (
    <DashboardLayout activeMenu='Dashboard'>
     <div className='my-5 mx-auto'>

      {/* Three templates */}

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>

        <InfoCard
        className='card-balance hover:shadow-purple-300'
        icon={<IoMdCard/>}
        label='Total Balance'
        value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
        color='bg-purple-500'
        />

        <InfoCard
        className='card-income hover:shadow-orange-300'
        icon={<LuWalletMinimal/>}
        label='Total Income'
        value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
        color='bg-orange-500'
        />

        <InfoCard
        className='card-expense  hover:shadow-red-300'
        icon={<LuHandCoins/>}
        label='Total Expense'
        value={addThousandsSeparator(dashboardData?.totalExpanses || 0)}
        color='bg-red-500'
        />
      </div>
       
        {/* Recent transactions cards */}

       <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
        <RecentTransactions
        transactions={dashboardData?.recentTransactions}
        onSeeMore={()=> navigate('/expense')}
        />

        {/* Chart Overview */}

        <FinanceOverview
        totalBalance={dashboardData?.totalBalance || 0}
        totalIncome={dashboardData?.totalIncome || 0}
        totalExpense={dashboardData?.totalExpanses || 0}
        />

          {/* All Expanse transactions with graph */}
         
        <Last30DaysExpanses
        data={dashboardData?.last30DaysExpanses?.transactions || []}
        className='card-expense-main'
        />

        <ExpenseTransactions
        transactions={dashboardData?.last30DaysExpanses?.transactions || []}
        onSeeMore={()=> navigate('/expense')}
        />


        <RecentIncome
        transactions={dashboardData?.last60DaysIncome?.transactions || []}
        onSeeMore={()=>navigate('/income')}
        />

        <RecentIncomeWithChart
        data={dashboardData?.last60DaysIncome?.transactions?.slice(0,4) || []}
        totalIncome={dashboardData?.totalIncome || 0}
        />

       </div>
     </div>
    </DashboardLayout>
  )
}

export default Home
