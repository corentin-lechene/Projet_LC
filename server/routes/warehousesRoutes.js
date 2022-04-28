// import express
import express from "express";

// init express warehousesRouter
const warehousesRouter = express.Router();

// import function from controller
import { showWarehouses, showWarehousesById, createWarehouses, deleteWarehouses  } from "../controllers/warehouses.js";


warehousesRouter.get('/warehouses', showWarehouses);
warehousesRouter.get('/warehouses/:id', showWarehousesById);
warehousesRouter.post('/warehouses', createWarehouses);
warehousesRouter.delete('/warehouses/:id', deleteWarehouses);

export default warehousesRouter;
