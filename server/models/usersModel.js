// import connection
import db, {preserve, encodeToken, decodeToken} from "../config/database.js";
import {sha512} from "js-sha512";

// Get All Users
export const getUsers = (result) => {
    db.query("SELECT * FROM users ORDER BY user_id DESC", (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

export const getUsersByCompanyId = (id, result) => {
    db.query("SELECT * FROM users INNER JOIN companies c on users.user_id = c.user_id WHERE company_id = ? ORDER BY user_id DESC", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Get All Users
export const getUsersForStaffs = (result) => {
    db.query("SELECT * FROM users WHERE role != 'staffs' AND role != 'admin' ORDER BY user_id DESC", (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Get Single Users
export const getUsersById = (id, result) => {
    db.query("SELECT * FROM users INNER JOIN customers c on users.user_id = c.user_id INNER JOIN cards c2 on c.card_id = c2.card_id INNER JOIN companies c3 on c.company_id = c3.company_id WHERE users.user_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Login User
export const getUsersByLogIn = (email, password, result) => {
    db.query("SELECT * FROM users WHERE mail = ? AND password = ?", [email, sha512(password)], (err, resultsLogin) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            if (resultsLogin[0] !== undefined) {
                let data = resultsLogin[0];
                let token = encodeToken(data);
                db.query("UPDATE users SET token = ? WHERE user_id = ?", [token, data.user_id], (err) => {
                    if (err) {
                        result({error: true, reason: err});
                    } else {
                        result({valid: true, result: resultsLogin[0]});
                    }
                });
            } else {
                result({valid: false, result: "Connexion failed"});
            }
        }
    });
}

// Tokeen du user
export const getUserByToken = (token, result) => {
    db.query("SELECT user_id, role FROM users WHERE token = ?", [token], (err, resultsToken) => {
        if(err) {
            result({error: true, reason: err});
        } else if (!resultsToken[0]) {
            result({valid: false, reason: "token invalid"});
        } else {
            const data = decodeToken(token);
            const role = preserve(resultsToken[0].role);
            db.query("SELECT * FROM users u INNER JOIN " + role + " s on u.user_id = s.user_id WHERE s.user_id = ?", [data.user_id], (err, results) => {
                if (err) {
                    result({error: true, reason: err});
                } else {
                    result({valid: true, result: results[0]});
                }
            })
        }
    });
}

// Insert Users to Database
export const insertUsers = (data, result) => {
    db.query("INSERT INTO users SET ?", [data], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else if (results.affectedRows !== 0) {
            result({valid: true, result: "Colonne ajoutée"});
        }
    });
}

// Update Users to Database
export const updateUsersById = (data, id, result) => {
    db.query("UPDATE users SET name = ? /* TODO */, user_id = ?", [data.name /* TODO */, id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Delete Users to Database
export const deleteUsersById = (id, result) => {
    db.query("DELETE FROM users WHERE user_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else if (results.affectedRows !== 0) {
            result({valid: true, result: "Colonne supprimée"});
        } else {
            result({valid: false, reason: "Colonne non supprimée ou inexistante"});
        }
    });
}
