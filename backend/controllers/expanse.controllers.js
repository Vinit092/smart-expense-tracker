import xlsx from 'xlsx';
import Expanse from '../models/Expanse.js';

export const addExpanse=async(req,res)=>{
    try {
        const userId= req.user.id;
        const {icon,category,amount,date}=req.body;

        if(!category ||!amount ||!date){
            return res.status(400).json({message: "All fields are required!"});
        }

        const newExpanse=new Expanse({
            userId,
            icon,
            category,
            amount: Number(amount) ,
            date: new Date(date || Date.now()),
        });

        await newExpanse.save();
        res.status(200).json(newExpanse);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
};


export const getAllExpanse=async(req,res)=>{
    try {
        const userId=req.user.id;
        const expanse=await Expanse.find({userId}).sort({date: -1});
        res.json(expanse);
    } catch (error) {
        res.status(500).json({message: "server error"});
    }
};


export const deleteExpanse=async(req,res)=>{
    try {
        await Expanse.findByIdAndDelete(req.params.id);
        res.json({message: "Expanse deleted successfully!"});
    } catch (error) {
         res.status(500).json({message: "server error"});
    }
};
export const downloadExpanseExcel=async(req,res)=>{
        try {
            const userId=req.user.id;
            const expanse=await Expanse.find({userId}).sort({date: -1});

            const data=expanse.map((item)=>({
                Category: item.category,
                Amount: item.amount,
                Date: new Date(item.date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                }),
            }));

            const wb=xlsx.utils.book_new();
            const ws=xlsx.utils.json_to_sheet(data);
            xlsx.utils.book_append_sheet(wb, ws, "Expanse");
            xlsx.writeFile(wb,'expanse_details.xlsx');
            res.download('expanse_details.xlsx');
        } catch (error) {
            res.status(500).json({message: "server error"});
        }
};