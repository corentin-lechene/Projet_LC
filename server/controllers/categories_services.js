// Import function from Categories_services Model
import { getCategories_services, getCategories_servicesById, insertCategories_services, updateCategories_servicesById, deleteCategories_servicesById } from "../models/categories_servicesModel.js";

// Get All Categories_services
export const showCategories_services = (req, res) => {
    getCategories_services((err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}
      
// Get Single Categories_services
export const showCategories_servicesById = (req, res) => {
    getCategories_servicesById(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
       }
   });
}
      
// Create New Categories_services
export const createCategories_services = (req, res) => {
    const data = req.body;
    insertCategories_services(data, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Update Categories_services
export const updateCategories_services = (req, res) => {
    const data  = req.body;
    const id    = req.params.id;
    updateCategories_servicesById(data, id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Delete Categories_services
export const deleteCategories_services = (req, res) => {
    const id = req.params.id;
    deleteCategories_servicesById(id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

