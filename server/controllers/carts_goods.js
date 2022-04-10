// Import function from Carts_goods Model
import { getCarts_goods, getCarts_goodsById, insertCarts_goods, updateCarts_goodsById, deleteCarts_goodsById } from "../models/carts_goodsModel.js";

// Get All Carts_goods
export const showCarts_goods = (req, res) => {
    getCarts_goods((err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}
      
// Get Single Carts_goods
export const showCarts_goodsById = (req, res) => {
    getCarts_goodsById(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
       }
   });
}
      
// Create New Carts_goods
export const createCarts_goods = (req, res) => {
    const data = req.body;
    insertCarts_goods(data, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Update Carts_goods
export const updateCarts_goods = (req, res) => {
    const quantity  = req.body.quantity;
    const id = req.params.id;
    updateCarts_goodsById(quantity, id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Delete Carts_goods
export const deleteCarts_goods = (req, res) => {
    const id = req.params.id;
    deleteCarts_goodsById(id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

