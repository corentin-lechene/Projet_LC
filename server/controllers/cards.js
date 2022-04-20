// Import function from Cards Model
import { getCards, getCardsById, insertCards, updateCardsById, deleteCardsById } from "../models/cardsModel.js";

// Get All Cards
export const showCards = (req, res) => {
    getCards((err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}
      
// Get Single Cards
export const showCardsById = (req, res) => {
    getCardsById(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
       }
   });
}
      
// Create New Cards
export const createCards = (req, res) => {
    const data = req.body;
    insertCards(data, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Update Cards
export const updateCards = (req, res) => {
    const data  = req.body;
    const card_id    = req.params.id;
    updateCardsById(data, card_id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Delete Cards
export const deleteCards = (req, res) => {
    const id = req.params.id;
    deleteCardsById(id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

