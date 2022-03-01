// Import function from Customers Model
import { getCustomers, getCustomersById, insertCustomers, updateCustomersById, deleteCustomersById } from "../models/customersModel.js";

// Get All Customers
export const showCustomers = (req, res) => {
    getCustomers((err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}
      
// Get Single Customers
export const showCustomersById = (req, res) => {
    getCustomersById(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
       }
   });
}
      
// Create New Customers
export const createCustomers = (req, res) => {
    const data = req.body;
    insertCustomers(data, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Update Customers
export const updateCustomers = (req, res) => {
    const data  = req.body;
    const id    = req.params.id;
    updateCustomersById(data, id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Delete Customers
export const deleteCustomers = (req, res) => {
    const id = req.params.id;
    deleteCustomersById(id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

