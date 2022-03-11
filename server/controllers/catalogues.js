// Import function from Catalogues Model
import { getCatalogues, getCataloguesById, insertCatalogues, updateCataloguesById, deleteCataloguesById } from "../models/cataloguesModel.js";

// Get All Catalogues
export const showCatalogues = (req, res) => {
    getCatalogues((err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}
      
// Get Single Catalogues
export const showCataloguesById = (req, res) => {
    getCataloguesById(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
       }
   });
}
      
// Create New Catalogues
export const createCatalogues = (req, res) => {
    const data = req.body;
    insertCatalogues(data, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Update Catalogues
export const updateCatalogues = (req, res) => {
    const data  = req.body;
    const id    = req.params.id;
    updateCataloguesById(data, id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Delete Catalogues
export const deleteCatalogues = (req, res) => {
    const id = req.params.id;
    deleteCataloguesById(id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

