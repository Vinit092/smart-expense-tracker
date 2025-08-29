export const BASE_URL='http://localhost:5002';

export const API_PATHS={
    AUTH:{
        LOGIN:'/api/auth/login',
        REGISTER: '/api/auth/register',
        GET_USER_INFO: '/api/auth/getuser',
    },
    DASHBOARD:{
        GET_DATA: '/api/dashboard',
    },
    INCOME:{
        ADD_INCOME: '/api/income/add',
        GET_ALL_INCOME: '/api/income/get',
        DELETE_INCOME: (incomeId)=> `/api/income/${incomeId}`,
        DOWNLOAD_INCOME: '/api/income/downloadexcel',
    },
    EXPANSE:{
        ADD_EXPANSE: '/api/expanse/add',
        GET_ALL_EXPANSE: '/api/expanse/get',
        DELETE_EXPANSE: (expanseId)=> `/api/expanse/${expanseId}`,
        DOWNLOAD_EXPANSE: '/api/expanse/downloadexcel',
    },
    IMAGE:{
        UPLOAD_IMAGE: '/api/auth/upload-image',
    }
};