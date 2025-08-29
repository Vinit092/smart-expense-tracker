import xlsx from 'xlsx';
import Income from "../models/Income.js";

export const addIncome=async(req,res)=>{
    try {
        const userId= req.user.id;
        const {icon,source,amount,date}=req.body;

        if(!source ||!amount ||!date){
            return res.status(400).json({message: "All fields are required!"});
        }

        const newIncome=new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date),
        });

        await newIncome.save();
        res.status(200).json(newIncome);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
};


export const getAllIncome=async(req,res)=>{
    try {
        const userId=req.user.id;
        const income=await Income.find({userId}).sort({date: -1});
        res.json(income);
    } catch (error) {
        res.status(500).json({message: "server error"});
    }
};


export const deleteIncome=async(req,res)=>{
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.json({message: "Income deleted successfully!"});
    } catch (error) {
         res.status(500).json({message: "server error"});
    }
};
export const downloadIncomeExcel=async(req,res)=>{
        try {
            const userId=req.user.id;
            const income=await Income.find({userId}).sort({date: -1});

            const data=income.map((item)=>({
                Source: item.source,
                Amount: item.amount,
                Date: new Date(item.date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                }),
            }));

            const wb=xlsx.utils.book_new();
            const ws=xlsx.utils.json_to_sheet(data);
            xlsx.utils.book_append_sheet(wb, ws, "Income");
            xlsx.writeFile(wb,'income_details.xlsx');
            res.download('income_details.xlsx');
        } catch (error) {
            res.status(500).json({message: "server error"});
        }
};