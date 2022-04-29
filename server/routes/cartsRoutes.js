// import express
import express from "express";

// init express cartsRouter
const cartsRouter = express.Router();

// import function from controller
import {
    showCarts,
    showCartsById,
    createCarts,
    deleteCarts,
    showCartsByCustomerId,
    updateCarts,
    showCartsPayedByCustomerId,
    showCartsDashboard
} from "../controllers/carts.js";

cartsRouter.get('/carts-payed-customer/:id', showCartsPayedByCustomerId);
cartsRouter.get('/carts-dashboard/:id', showCartsDashboard);
cartsRouter.get('/carts-customer/:id', showCartsByCustomerId);
cartsRouter.get('/carts', showCarts);
cartsRouter.get('/carts/:id', showCartsById);
cartsRouter.post('/carts', createCarts);
cartsRouter.put('/carts/:id', updateCarts);
cartsRouter.delete('/carts/:id', deleteCarts);

export default cartsRouter;
