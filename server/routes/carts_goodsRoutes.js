// import express
import express from "express";

// init express carts_goodsRouter
const carts_goodsRouter = express.Router();

// import function from controller
import { showCarts_goods, showCarts_goodsById, createCarts_goods, deleteCarts_goods, updateCarts_goods } from "../controllers/carts_goods.js";


carts_goodsRouter.get('/carts_goods', showCarts_goods);
carts_goodsRouter.get('/carts_goods/:id', showCarts_goodsById);
carts_goodsRouter.post('/carts_goods', createCarts_goods);
carts_goodsRouter.put('/carts_goods/:id', updateCarts_goods);
carts_goodsRouter.delete('/carts_goods/:id', deleteCarts_goods);

export default carts_goodsRouter;
