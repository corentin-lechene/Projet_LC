// Import function from Users Model
import {
    getUsers,
    getUsersById,
    getUsersByLogIn,
    getUserByToken,
    insertUsers,
    deleteUsersById,
    getUsersByCompanyId,
    getUsersForStaffs,
    updateOnlineUsers,
    forgotPassword
} from "../models/usersModel.js";

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

export const showUsersForStaffs = (req, res) => {
    getUsersForStaffs((err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

export const showUsersByCompanyId = (req, res) => {
    getUsersByCompanyId(req.params.id,(err, results) => {
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

// Try to connect Users
export const loginUsers = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    getUsersByLogIn(email, password, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Verify the token
export const tokenUsers = (req, res) => {
    const data = req.body;
    getUserByToken(data.token, (err, results) => {
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
    insertUsers(data, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}


export const onlineUsers = (req, res) => {
    const id = req.params.id;
    updateOnlineUsers(id, (err, results) => {
        if (err){
            res.send(err);
        }else{
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

export const sendForgotPassword = (req, res) => {
    const email = req.params.email;
    forgotPassword(email, (err, results) => {
        if (err){
            res.send(err);
        } else {
            res.json(results);
        }
    });
}
