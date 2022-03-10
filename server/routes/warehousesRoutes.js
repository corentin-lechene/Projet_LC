// import express
import express from "express";

// init express warehousesRouter
const warehousesRouter = express.Router();

// import function from controller
import { showWarehouses, showWarehousesById, createWarehouses, deleteWarehouses /* TODO updateWarehouses */ } from "../controllers/warehouses.js";


warehousesRouter.get('/warehouses', showWarehouses);
warehousesRouter.get('/warehouses/:id', showWarehousesById);
warehousesRouter.post('/warehouses', createWarehouses);
//TODO warehousesRouter.put('/warehouses/:id', updateWarehouses);
warehousesRouter.delete('/warehouses/:id', deleteWarehouses);

export default warehousesRouter;
