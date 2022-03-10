// Import function from Services Model
import { getServices, getServicesById, insertServices, updateServicesById, deleteServicesById, getServicesBySellerId } from "../models/servicesModel.js";

// Get All Services
export const showServices = (req, res) => {
    getServices((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Get Single Services
export const showServicesById = (req, res) => {
    getServicesById(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Get Goods by seller
export const showServicesBySellerId = (req, res) => {
    getServicesBySellerId(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Create New Services
export const createServices = (req, res) => {
    const data = req.body;
    insertServices(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Update Services
export const updateServices = (req, res) => {
    const data  = req.body;
    const id    = req.params.id;
    updateServicesById(data, id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Delete Services
export const deleteServices = (req, res) => {
    const id = req.params.id;
    deleteServicesById(id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
