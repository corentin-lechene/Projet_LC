// import connection
import db, {preserve} from "../config/database.js";
import jsonwebtoken from "jsonwebtoken";

// Get All Users
export const getUsers = (result) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Get Single Users
export const getUsersById = (id, result) => {
    db.query("SELECT * FROM users WHERE user_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Login User
export const getUsersByLogIn = (email, password, result) => {
    db.query("SELECT * FROM users WHERE mail = ? AND password = ?", [email, password], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            if (results[0] !== undefined) {
                let data = results[0];
                let token = data.token || jsonwebtoken.sign(
                    {user_id: data.user_id, role: data.role},
                    `${process.env.VUE_APP_JWT_KEY_TOKEN}`,
                );

                db.query("UPDATE users SET token = ? WHERE user_id = ?", [token, data.user_id], (err) => {
                    if (err) {
                        result({error: true, reason: err});
                    } else {
                        result(null, token);
                    }
                });
            } else {
                result({valid: true, result: results[0]});
            }
        }
    });
}

// Tokeen du user
export const getUserByToken = (token, result) => {
    db.query("SELECT user_id FROM users WHERE token = ?", [token], (err, results) => {
        if(err) {
            result({error: true, reason: err});
        } else {
                if(!results[0]) {
                    result({valid: false, reason: "token invalid"});
                } else {
                    const data = jsonwebtoken.verify(token, `${process.env.VUE_APP_JWT_KEY_TOKEN}`);
                    const role = preserve(data.role);
                    db.query("SELECT * FROM users u INNER JOIN "+ role +" s on u.user_id = s.user_id WHERE s.user_id = ?", [data.user_id], (err, results) => {
                        if(err) {
                            result({error: true, reason: err});
                        } else {
                            result({valid: true, result: results[0]});
                        }
                    })
                }

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
