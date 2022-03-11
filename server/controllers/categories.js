// Import function from Categories Model
import { getCategories, getCategoriesById, insertCategories, updateCategoriesById, deleteCategoriesById } from "../models/categoriesModel.js";

// Get All Categories
export const showCategories = (req, res) => {
    getCategories((err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}
      
// Get Single Categories
export const showCategoriesById = (req, res) => {
    getCategoriesById(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
       }
   });
}
      
// Create New Categories
export const createCategories = (req, res) => {
    const data = req.body;
    insertCategories(data, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Update Categories
export const updateCategories = (req, res) => {
    const data  = req.body;
    const id    = req.params.id;
    updateCategoriesById(data, id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Delete Categories
export const deleteCategories = (req, res) => {
    const id = req.params.id;
    deleteCategoriesById(id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

