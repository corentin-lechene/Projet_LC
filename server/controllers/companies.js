// Import function from Companies Model
import { getCompanies, getCompaniesById, insertCompanies, updateCompaniesById, deleteCompaniesById } from "../models/companiesModel.js";

// Get All Companies
export const showCompanies = (req, res) => {
    getCompanies((err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}
      
// Get Single Companies
export const showCompaniesById = (req, res) => {
    getCompaniesById(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
       }
   });
}
      
// Create New Companies
export const createCompanies = (req, res) => {
    const data = req.body;
    insertCompanies(data, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Update Companies
export const updateCompanies = (req, res) => {
    const data  = req.body;
    const id    = req.params.id;
    updateCompaniesById(data, id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Delete Companies
export const deleteCompanies = (req, res) => {
    const id = req.params.id;
    deleteCompaniesById(id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

