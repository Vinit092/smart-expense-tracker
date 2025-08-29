import express from 'express'
import { protect } from '../middleware/auth.middleware.js'
import {getDashboardData} from '../controllers/dashboard.controllers.js'

const router=express.Router();

router.get('/',protect,getDashboardData);

export default router;