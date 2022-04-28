// Import function from Warehouses Model
import { getWarehouses, getWarehousesById, insertWarehouses, deleteWarehousesById } from "../models/warehousesModel.js";

// Get All Warehouses
export const showWarehouses = (req, res) => {
    getWarehouses((err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}
      
// Get Single Warehouses
export const showWarehousesById = (req, res) => {
    getWarehousesById(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
       }
   });
}
      
// Create New Warehouses
export const createWarehouses = (req, res) => {
    const data = req.body;
    insertWarehouses(data, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}


// Delete Warehouses
export const deleteWarehouses = (req, res) => {
    const id = req.params.id;
    deleteWarehousesById(id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

