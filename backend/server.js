import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js'
import incomeRoutes from './routes/income.routes.js'
import expanseRoutes from './routes/expanse.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app=express();

// Middleware to handle CORS

app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type','Authorization'],
    credentials: true
}));

app.use(express.json());

const PORT= process.env.PORT || 5002;

app.use('/api/auth',authRoutes);
app.use('/api/income',incomeRoutes);
app.use('/api/expanse',expanseRoutes);
app.use('/api/dashboard',dashboardRoutes);

// server uploads folder
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.listen(PORT,()=>{
    connectDB();
    console.log(`server running on port ${PORT}`);
});