// Import function from Warehouses_stocks Model
import { getWarehouses_stocks, getWarehouses_stocksById, insertWarehouses_stocks, updateWarehouses_stocksById, deleteWarehouses_stocksById } from "../models/warehouses_stocksModel.js";

// Get All Warehouses_stocks
export const showWarehouses_stocks = (req, res) => {
    getWarehouses_stocks((err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}
      
// Get Single Warehouses_stocks
export const showWarehouses_stocksById = (req, res) => {
    getWarehouses_stocksById(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
       }
   });
}
      
// Create New Warehouses_stocks
export const createWarehouses_stocks = (req, res) => {
    const data = req.body;
    insertWarehouses_stocks(data, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Update Warehouses_stocks
export const updateWarehouses_stocks = (req, res) => {
    const data  = req.body;
    const id    = req.params.id;
    updateWarehouses_stocksById(data, id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Delete Warehouses_stocks
export const deleteWarehouses_stocks = (req, res) => {
    const id = req.params.id;
    deleteWarehouses_stocksById(id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

