// import express
import express from "express";

// init express cardsRouter
const cardsRouter = express.Router();

// import function from controller
import { showCards, showCardsById /* TODO , createCards, updateCards, deleteCards */ } from "../controllers/cards.js";


cardsRouter.get('/cards', showCards);
cardsRouter.get('/cards/:id', showCardsById);
//TODO cardsRouter.post('/cards', createCards);
//TODO cardsRouter.put('/cards/:id', updateCards);
//TODO cardsRouter.delete('/cards/:id', deleteCards);

export default cardsRouter;
