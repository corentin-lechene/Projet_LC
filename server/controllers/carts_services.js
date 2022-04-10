// Import function from Carts_services Model
import { getCarts_services, getCarts_servicesById, insertCarts_services, updateCarts_servicesById, deleteCarts_servicesById } from "../models/carts_servicesModel.js";

// Get All Carts_services
export const showCarts_services = (req, res) => {
    getCarts_services((err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}
      
// Get Single Carts_services
export const showCarts_servicesById = (req, res) => {
    getCarts_servicesById(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
       }
   });
}
      
// Create New Carts_services
export const createCarts_services = (req, res) => {
    const data = req.body;
    insertCarts_services(data, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Update Carts_services
export const updateCarts_services = (req, res) => {
    const quantity  = req.body.quantity;
    const id    = req.params.id;
    updateCarts_servicesById(quantity, id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Delete Carts_services
export const deleteCarts_services = (req, res) => {
    const id = req.params.id;
    deleteCarts_servicesById(id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

