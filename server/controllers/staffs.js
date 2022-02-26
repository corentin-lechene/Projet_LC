// Import function from Staffs Model
import {getStaffs, getStaffsById, insertStaffs, updateStaffsById, deleteStaffsById} from "../models/staffsModel.js";

// Get All Staffs
export const showStaffs = (req, res) => {
    getStaffs((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Get Single Staffs
export const showStaffsById = (req, res) => {
    getStaffsById(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Create New Staffs
export const createStaffs = (req, res) => {
    const data = req.body;
    insertStaffs(data, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Update Staffs
export const updateStaffs = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    updateStaffsById(data, id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Delete Staffs
export const deleteStaffs = (req, res) => {
    const id = req.params.id;
    deleteStaffsById(id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

