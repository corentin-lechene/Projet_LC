// import express
import express from "express";

// import function from controller
import {showGoods, showGoodsById, createGoods, updateGoods, deleteGoods} from "../controllers/goods.js";

// init express router
const router = express.Router();

// Get All Goods
router.get('/goods', showGoods);

// Get Single Goods
router.get('/goods/:id', showGoodsById);

// Create New Goods
router.post('/goods', createGoods);

// Update Goods
router.put('/goods/:id', updateGoods);

// Delete Goods
router.delete('/goods/:id', deleteGoods);

export default router;