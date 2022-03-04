// import express
import express from "express";

// init express sellersRouter
const sellersRouter = express.Router();

// import function from controller
import {showSellers, showSellersById} from "../controllers/sellers.js";


sellersRouter.get('/sellers', showSellers);
sellersRouter.get('/sellers/:id', showSellersById);

export default sellersRouter;