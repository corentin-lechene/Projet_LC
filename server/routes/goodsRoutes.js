// import express
import express from "express";

// init express goodsRouter
const goodsRouter = express.Router();

// import function from controller
import {showGoods, showGoodsById, createGoods, updateGoods, deleteGoods, showGoodsBySellerId} from "../controllers/goods.js";

goodsRouter.get('/goods', showGoods);
goodsRouter.get('/goods-sellers/:id', showGoodsBySellerId);
goodsRouter.get('/goods/:id', showGoodsById);
goodsRouter.post('/goods', createGoods);
goodsRouter.put('/goods/:id', updateGoods);
goodsRouter.delete('/goods/:id', deleteGoods);

export default goodsRouter;