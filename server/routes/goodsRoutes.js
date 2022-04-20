// import express
import express from "express";

// init express goodsRouter
const goodsRouter = express.Router();

// import function from controller
import {
    showGoods,
    showGoodsById,
    createGoods,
    updateGoods,
    deleteGoods,
    showGoodsBySellerId,
    showGoodsOrServicesByCategoryId,
    showGoodsByWarehouseId,
    showGoodsOrServicesByCartId
} from "../controllers/goods.js";

goodsRouter.get('/goods-warehouse/:id', showGoodsByWarehouseId);
goodsRouter.get('/good-service-category/:id', showGoodsOrServicesByCategoryId);
goodsRouter.get('/goods-cart/:id', showGoodsOrServicesByCartId);
goodsRouter.get('/goods', showGoods);
goodsRouter.get('/goods-sellers/:id', showGoodsBySellerId);
goodsRouter.get('/goods/:id', showGoodsById);
goodsRouter.post('/goods', createGoods);
goodsRouter.put('/goods/:id', updateGoods);
goodsRouter.delete('/goods/:id', deleteGoods);

export default goodsRouter;