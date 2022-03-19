// import express
import express from "express";

// init express carts_servicesRouter
const carts_servicesRouter = express.Router();

// import function from controller
import { showCarts_services, showCarts_servicesById, createCarts_services, deleteCarts_services, updateCarts_services } from "../controllers/carts_services.js";


carts_servicesRouter.get('/carts_services', showCarts_services);
carts_servicesRouter.get('/carts_services/:id', showCarts_servicesById);
carts_servicesRouter.post('/carts_services', createCarts_services);
carts_servicesRouter.put('/carts_services/:id', updateCarts_services);
carts_servicesRouter.delete('/carts_services/:id', deleteCarts_services);

export default carts_servicesRouter;
