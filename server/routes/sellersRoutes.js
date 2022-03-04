// import express
import express from "express";

// init express sellersRouter
const sellersRouter = express.Router();

// import function from controller
import {showSellers, showSellersById, createSellers, updateSellers, deleteSellers} from "../controllers/sellers.js";



sellersRouter.get('/sellers', showSellers);
sellersRouter.get('/sellers/:id', showSellersById);
sellersRouter.post('/sellers', createSellers);
sellersRouter.put('/sellers/:id', updateSellers);
sellersRouter.delete('/sellers/:id', deleteSellers);

export default sellersRouter;