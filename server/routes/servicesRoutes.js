// import express
import express from "express";

// init express goodsRouter
const servicesRouter = express.Router();

// import function from controller
import {showServices, showServicesById, /** TODO createGoods, updateGoods, deleteGoods **/ } from "../controllers/services.js";
servicesRouter.get('/services', showServices);
servicesRouter.get('/services/:id', showServicesById);


export default servicesRouter;