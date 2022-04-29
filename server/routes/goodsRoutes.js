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
    showGoodsOrServicesByCategoryId,
    showGoodsByWarehouseId,
    showGoodsOrServicesByCartId,
    showGoodsOrServicesBySellerId
} from "../controllers/goods.js";

goodsRouter.get('/good-service-category/:id', showGoodsOrServicesByCategoryId);
goodsRouter.get('/goods-warehouse/:id', showGoodsByWarehouseId);
goodsRouter.get('/goods-cart/:id&:cart_id', showGoodsOrServicesByCartId);
goodsRouter.get('/goods-seller/:id', showGoodsOrServicesBySellerId);
goodsRouter.get('/goods', showGoods);
goodsRouter.get('/goods/:id', showGoodsById);
goodsRouter.post('/goods', createGoods);
goodsRouter.put('/goods/:id', updateGoods);
goodsRouter.delete('/goods/:id', deleteGoods);

export default goodsRouter;