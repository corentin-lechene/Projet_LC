// Import function from Categories_goods Model
import { getCategories_goods, getCategories_goodsById, insertCategories_goods, updateCategories_goodsById, deleteCategories_goodsById } from "../models/categories_goodsModel.js";

// Get All Categories_goods
export const showCategories_goods = (req, res) => {
    getCategories_goods((err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}
      
// Get Single Categories_goods
export const showCategories_goodsById = (req, res) => {
    getCategories_goodsById(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
       }
   });
}
      
// Create New Categories_goods
export const createCategories_goods = (req, res) => {
    const data = req.body;
    insertCategories_goods(data, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Update Categories_goods
export const updateCategories_goods = (req, res) => {
    const data  = req.body;
    const id    = req.params.id;
    updateCategories_goodsById(data, id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Delete Categories_goods
export const deleteCategories_goods = (req, res) => {
    const id = req.params.id;
    deleteCategories_goodsById(id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

