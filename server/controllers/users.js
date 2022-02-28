// Import function from Users Model
import { getUsers, getUsersById, insertUsers, updateUsersById, deleteUsersById } from "../models/usersModel.js";

// Get All Users
export const showUsers = (req, res) => {
    getUsers((err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}
      
// Get Single Users
export const showUsersById = (req, res) => {
    getUsersById(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
       }
   });
}
      
// Create New Users
export const createUsers = (req, res) => {
    const data = req.body;
    console.log(data);
    insertUsers(data, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Update Users
export const updateUsers = (req, res) => {
    const data  = req.body;
    const id    = req.params.id;
    updateUsersById(data, id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Delete Users
export const deleteUsers = (req, res) => {
    const id = req.params.id;
    deleteUsersById(id, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

