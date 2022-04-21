// import express
import express from "express";

// init express warehouses_stocksRouter
const warehouses_stocksRouter = express.Router();

// import function from controller
import { showWarehouses_stocks, showWarehouses_stocksById, createWarehouses_stocks, deleteWarehouses_stocks, updateWarehouses_stocks } from "../controllers/warehouses_stocks.js";


warehouses_stocksRouter.get('/warehouses_stocks', showWarehouses_stocks);
warehouses_stocksRouter.get('/warehouses_stocks/:id', showWarehouses_stocksById);
warehouses_stocksRouter.post('/warehouses_stocks', createWarehouses_stocks);
warehouses_stocksRouter.put('/warehouses_stocks/:id', updateWarehouses_stocks);
warehouses_stocksRouter.delete('/warehouses_stocks/:id', deleteWarehouses_stocks);

export default warehouses_stocksRouter;
