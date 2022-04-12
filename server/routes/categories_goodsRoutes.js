// import express
import express from "express";

// init express categories_goodsRouter
const categories_goodsRouter = express.Router();

// import function from controller
import { showCategories_goods, showCategories_goodsById, createCategories_goods, deleteCategories_goods /* TODO updateCategories_goods */ } from "../controllers/categories_goods.js";


categories_goodsRouter.get('/categories_goods', showCategories_goods);
categories_goodsRouter.get('/categories_goods/:id', showCategories_goodsById);
categories_goodsRouter.post('/categories_goods', createCategories_goods);
//TODO categories_goodsRouter.put('/categories_goods/:id', updateCategories_goods);
categories_goodsRouter.delete('/categories_goods/:id', deleteCategories_goods);

export default categories_goodsRouter;
