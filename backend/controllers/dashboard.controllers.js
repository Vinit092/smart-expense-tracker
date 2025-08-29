import { isValidObjectId, Types } from "mongoose";
import Income from "../models/Income.js";
import Expanse from "../models/Expanse.js";

export const getDashboardData=async (req,res)=>{
        try {
            const userId=req.user.id;
            const userObjectId=new Types.ObjectId(String(userId));

            // fetching total income and expanse
            const totalIncome=await Income.aggregate([
                {$match:{userId: userObjectId}},
                {$group:{_id: null, total:{$sum:"$amount"}}},
            ]);

            console.log("Total Income",{totalIncome,userId:isValidObjectId(userId)});

            const totalExpanse=await Expanse.aggregate([
                 {$match:{userId: userObjectId}},
                 {$group:{_id: null, total:{$sum:"$amount"}}},
            ]);

            // get income transacitions in the last 60 days

            const last60DaysIncomeTransactions=await Income.find({
                userId  ,
                date:{$gte: new Date(Date.now()-60*24*60*60*1000)},
            }).sort({date:-1});
            
            
            const incomeLast60Days=last60DaysIncomeTransactions.reduce((sum,transaction)=>sum+transaction.amount, 0);

            // get expanse transaction in the last 30 days

            const last30DaysExpanseTransactions=await Expanse.find({
                userId,
                date:{$gte: new Date(Date.now() - 30*24*60*60*1000)},
            }).sort({date:-1});

            // get total expanses for last 30 days

            const expansesLast30Days=last30DaysExpanseTransactions.reduce((sum,transaction)=>sum+transaction.amount, 0);

            // fetching last 5 transactions (income + expanses)
            const lastTransactions=[...(await Income.find({userId}).sort({date:-1}).limit(5)).map(
                (txn)=>({
                    ...txn.toObject(),
                    type: "income",
                })
            ),
            ...(await Expanse.find({userId}).sort({date:-1}).limit(5)).map(
                (txn)=>({
                    ...txn.toObject(),
                    type: "expanse",
                })
            )
        ].sort((a,b)=>b.date - a.date);

        // final res

        res.json({
            totalBalance:(totalIncome[0]?.total || 0) - (totalExpanse[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpanses: totalExpanse[0]?.total || 0,
            last30DaysExpanses:{
                total: expansesLast30Days,
                transactions: last30DaysExpanseTransactions,
            },
            last60DaysIncome:{
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransactions,
            },
            recentTransactions: lastTransactions,
           });
        } catch (error) {
            res.status(500).json({message: "Server Error",error});
        }
};