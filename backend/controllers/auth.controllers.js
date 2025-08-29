import jwt from 'jsonwebtoken'
import User from '../models/User.js';

const generateToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn: '24h'})
};  

export const registerUser=async(req,res)=>{
    try {
    const {fullName, email, password, profileImgUrl}=req.body;

    if(!fullName || !email || !password){
        return res.status(400).json({message: "All fields are required!"});
    }
    
    const existingUser=await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message: 'Email already exists!'});
    }

    const user=await User.create({
        fullName,
        email,
        password,
        profileImgUrl,
    });

    res.status(201).json({
        id:user._id,
        user,
        token: generateToken(user._id), 
    });
    } catch (error) {
        res.status(500).json({message: 'Error registering user!', error: error.message});
    }
    
};  

export const loginUser=async(req,res)=>{
    try {
    const {email,password}=req.body;

    if(!email || !password){
        return res.status(400).json({message: "All fields are required!"});
    }

    const user=await User.findOne({email});
    if(!user || !(await user.comparePassword(password))){
        return res.status(400).json({message: "Invalid credentials!"});
    }
    res.status(200).json({
        id: user._id,
        user,
        token: generateToken(user._id),
    });
    } catch (error) {
        res.status(500).json({message: 'Error registering user!', error: error.message});
    }
};

export const getUserInfo=async(req,res)=>{
        try {
            const user= await User.findById(req.user.id).select('-password');

            if(!user){
                return res.status(404).json({message: "User not found"});
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({message: 'Error registering user!', error: error.message});
        }
};  