import express from 'express'
import {registerUser, loginUser, getUserInfo} from '../controllers/auth.controllers.js'
import {protect} from '../middleware/auth.middleware.js'
import upload from '../middleware/upload.middleware.js';

const router=express.Router();

router.post('/register',registerUser);

router.post('/login',loginUser);

router.get('/getuser', protect ,getUserInfo);

router.post('/upload-image',upload.single('image'),(req,res)=>{
    if(!req.file){
        return res.status(400).json({message: "No file uploaded!"});
    }

    const imageUrl=`${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(200).json({imageUrl});
});

export default router;