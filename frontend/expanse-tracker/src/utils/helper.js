import moment from "moment";
import { data } from "react-router-dom";

export const validateEmail=(email)=>{
    const regex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};

export const getInitials=(name)=>{
    if(!name) return '';

    const words= name.split(' ');
    let initials='';

    for(let i = 0; i < Math.min(words.length, 2); i++){
        initials += words[i][0];
    }
    return initials.toUpperCase();
};

export const addThousandsSeparator=(num)=>{
    if(num==null || isNaN(num)) return '';

    const [integerPart,fractionalPart]=num.toString().split(".");
    const formattedInteger=integerPart.replace(/\B(?=(\d{3})+(?!\d))/g,",");

    return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

export const prepareExpenseBarCharData=(data=[])=>{
        const charData=data.map((item)=>({
            category: item?.category,
            amount: item?.amount,
        }));

        return charData;
};

export const prepareIncomeBarCharData=(data=[])=>{
    const sortedData= [...data].sort((a,b)=> new Date(a.date) - new Date(b.date));

    const chartData=sortedData.map((item)=>({
        category:moment(item?.date).format('Do MMM'),
        amount: item?.amount,
        source: item?.source, 
    }));

    return chartData;
};

export const prepareExpenseLineCharData=(data=[])=>{
    const sortedData= [...data].sort((a,b)=> new Date(a.date) - new Date(b.date));

    const chartData= sortedData.map((item)=>({
        month: moment(item?.date).format('Do MMM'),
        amount: item?.amount,
        category: item?.category,
    }));

        return chartData;
};