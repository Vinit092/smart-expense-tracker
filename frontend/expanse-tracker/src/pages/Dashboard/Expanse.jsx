import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import axiosInstance from '../../utils/axios.instance';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import ExpenseOverview from '../../components/expense/ExpenseOverview';
import Modal from '../../components/Modal';
import AddExpenseForm from '../../components/expense/AddExpenseForm';
import { useUserAuth } from '../../hooks/useUserAuth';
import ExpenseList from '../../components/expense/ExpenseList';
import DeleteAlert from '../../components/DeleteAlert';

const Expanse = () => {

    useUserAuth();
  
    const [expenseData,setExpenseData]=useState([]);
    const [loading,setLoading]=useState(false);
    const [openDeleteAlert,setOpenDeleteAlert]=useState({
      show: false,
      data: null,
    });
  
    const [openAddExpenseModal,setOpenAddExpenseModal]=useState(false);

    // Get all expanse details
  const fetchExpenseDetails=async()=>{

    if(loading) return;

    setLoading(true);
      try {
          const response= await axiosInstance.get(
            `${API_PATHS.EXPANSE.GET_ALL_EXPANSE}`
          );

          if(response.data){
            setExpenseData(response.data);
          }
      } catch (error) {
          console.log("Something went wrong. Please try again later.",error);
      }
      finally{
        setLoading(false);
      }
  };

  // Handle add expanse
  const handleAddExpense=async (expanse)=>{
      const {category, amount, date, icon}=expanse;

      // checks validation
      if(!category.trim()){
        toast.error('Category is required!');
        return
      }

      if(!amount || isNaN(amount) || Number(amount)<= 0){
        toast.error('Amount should be a valid number greater than 0.')
        return
      }
      if(!date){
        toast.error("Date is required!");
        return;
      }
      
      try {
        await axiosInstance.post(API_PATHS.EXPANSE.ADD_EXPANSE,{
          category,
          amount,
          date,
          icon,
        });

        setOpenAddExpenseModal(false);
        toast.success("Expense Added Successfully!");
        fetchExpenseDetails();

      } catch (error) {
        console.error("Error adding expense:", error.response?.data?.message || error.message);
      }
  };

    // Delete expanse
  const deleteExpense=async (id)=>{
      try {
        await axiosInstance.delete(API_PATHS.EXPANSE.DELETE_EXPANSE(id));

        setOpenDeleteAlert({show:false, data:null});
        toast.success("Expense details deleted successfully!")
        fetchExpenseDetails();
      } catch (error) {
        console.error('Error deleting expense:',error.response?.data?.message || error.message);
      }
  };    

  // Handle download expense details
  const handleDownloadExpenseDetails=async ()=>{
      try {
        const response= await axiosInstance.get(
          API_PATHS.EXPANSE.DOWNLOAD_EXPANSE,
          {
            responseType: 'blob',
          }
        );

        // Create a URL for the blob
        const url= window.URL.createObjectURL(new Blob([response.data]));
        const link= document.createElement('a');
        link.href=url;
        link.setAttribute('download','expense_details.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading expense details:",error);
        toast.error('Failed to download expense details. Please try again later.');
      }
  };


  useEffect(()=>{fetchExpenseDetails()},[]);
  return (
    <>
     <DashboardLayout activeMenu='Expense'>
     <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <ExpenseOverview
            transactions={expenseData}
            onExpenseIncome={()=>setOpenAddExpenseModal(true)}
            />
          </div>

        <ExpenseList
        transactions={expenseData}
        onDelete={(id)=>{
          setOpenDeleteAlert({show:true, data: id});
        }}
        onDownload={handleDownloadExpenseDetails}
        />

        </div>

        <Modal
        isOpen={openAddExpenseModal}
        onClose={()=>setOpenAddExpenseModal(false)}
        title='Add Expense'
        >
          <AddExpenseForm
          onAddExpense={handleAddExpense}
          />
        </Modal>

        <Modal
      isOpen={openDeleteAlert.show}
      onClose={()=> setOpenDeleteAlert({show:false, data:null})}
      title='Delete Expense'
      >
        <DeleteAlert
        content='Are you sure you want to delete this expense detail?'
        onDelete={()=>deleteExpense(openDeleteAlert.data)}
        />
      </Modal>

     </div>
     </DashboardLayout>
    </>
  )
}

export default Expanse
