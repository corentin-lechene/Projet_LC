// Import function from Sellers Model
import {getSellers, getSellersById, insertSellers, updateSellersById, deleteSellersById} from "../models/sellersModel.js";

// Get All Sellers
export const showSellers = (req, res) => {
    getSellers((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Get Single Sellers
export const showSellersById = (req, res) => {
    getSellersById(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Create New Sellers
export const createSellers = (req, res) => {
    const data = req.body;
    insertSellers(data, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Update Sellers
export const updateSellers = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    updateSellersById(data, id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Delete Sellers
export const deleteSellers = (req, res) => {
    const id = req.params.id;
    deleteSellersById(id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

