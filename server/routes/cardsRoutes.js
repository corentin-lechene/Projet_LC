// import express
import express from "express";

// init express cardsRouter
const cardsRouter = express.Router();

// import function from controller
import { showCards, showCardsById, updateCards } from "../controllers/cards.js";


cardsRouter.get('/cards', showCards);
cardsRouter.get('/cards/:id', showCardsById);
//cardsRouter.post('/cards', createCards);
cardsRouter.put('/cards/:id', updateCards);
//cardsRouter.delete('/cards/:id', deleteCards);

export default cardsRouter;
