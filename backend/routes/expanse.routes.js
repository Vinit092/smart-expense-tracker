import express from 'express'
import {addExpanse,getAllExpanse,deleteExpanse,downloadExpanseExcel} from '../controllers/expanse.controllers.js'
import { protect } from '../middleware/auth.middleware.js'

const router=express.Router();

router.post('/add',protect,addExpanse);
router.get('/get',protect,getAllExpanse);
router.get('/downloadexcel',protect,downloadExpanseExcel);
router.delete('/:id',protect,deleteExpanse);

export default router;