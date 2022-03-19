// Import function from Carts Model
import { getCarts, getCartsById, insertCarts, updateCartsById, deleteCartsById, getCartsByCustomerId } from "../models/cartsModel.js";

// Get All Carts
export const showCarts = (req, res) => {
    getCarts((err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}
      
// Get Single Carts
export const showCartsById = (req, res) => {
    getCartsById(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
       }
   });
}

export const showCartsByCustomerId = (req, res) => {
    getCartsByCustomerId(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}
      
// Create New Carts
export const createCarts = (req, res) => {
    const data = req.body;
    insertCarts(data, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Update Carts
export const updateCarts = (req, res) => {
    const data  = req.body;
    const id    = req.params.id;
    updateCartsById(data, id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Delete Carts
export const deleteCarts = (req, res) => {
    const id = req.params.id;
    deleteCartsById(id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

