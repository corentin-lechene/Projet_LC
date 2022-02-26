// import connection
import db from "../config/database.js";


// Get All Users
export const getUsers = (result) => {
    db.query("SELECT * FROM users", (err, results) => {
        if(err) {
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Get Single Users
export const getUsersById = (id, result) => {
    db.query("SELECT * FROM users WHERE user_id = ?", [id], (err, results) => {
        if(err) {
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });
}

// Insert Users to Database
export const insertUsers = (data, result) => {
    db.query("INSERT INTO users SET ?", [data], (err, results) => {
        if(err) {
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Update Users to Database
export const updateUsersById = (data, id, result) => {
    db.query("UPDATE users SET name = ? /* TODO */, id = ?", [data.name /* TODO */, id], (err, results) => {
        if(err) {
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Delete Users to Database
export const deleteUsersById = (id, result) => {
    db.query("DELETE FROM users WHERE user_id = ?", [id], (err, results) => {
        if(err) {
            result(err, null);
        } else {
            result(null, results);
        }
    });
}
