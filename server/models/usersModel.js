// import connection
import db, {preserve, encodeToken, decodeToken, generatePassword} from "../config/database.js";
import {sha512} from "js-sha512";
import {sendEmail} from "../mails/mails.js";

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
    db.query("SELECT * FROM users INNER JOIN companies c on users.user_id = c.user_id WHERE company_id = ? ORDER BY users.user_id DESC", [id], (err, results) => {
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
    db.query("SELECT user_id, role FROM users WHERE user_id = ?", [id], (err, resultId) => {
        if(err) {
            result({error: true, reason: err});
        } else if (!resultId[0]) {
            result({valid: false, reason: "token invalid"});
        } else {
            const role = preserve(resultId[0].role);
            if(resultId[0].role !== 'admin') {
                db.query("SELECT * FROM users u INNER JOIN " + role + " s on u.user_id = s.user_id WHERE s.user_id = ?", [resultId[0].user_id], (err, results) => {
                    if (err) {
                        result({error: true, reason: err});
                    } else {
                        result({valid: true, result: results[0]});
                    }
                })
            } else if(resultId[0].role === 'admin') {
                db.query("SELECT * FROM users WHERE user_id = ?", [resultId[0].user_id], (err, results) => {
                    if (err) {
                        result({error: true, reason: err});
                    } else {
                        result({valid: true, result: results[0]});
                    }
                })
            }

        }
    });
}

// Login User
export const getUsersByLogIn = (email, password, result) => {
    db.query("SELECT user_id, role FROM users WHERE mail = ? AND password = ?", [email, sha512(password)], (err, resultsLogin) => {
        if (err) {
            result({error: true, reason: err});
        } else if (resultsLogin[0] !== undefined) {
            db.query("SELECT * FROM users WHERE user_id = ? and online = 1", [resultsLogin[0].user_id], (err, resultOnline) => {
                if (err) {
                    result({error: true, reason: err});
                } else if (resultOnline[0] !== undefined) {
                    let data = resultOnline[0];
                    let token = encodeToken(data);
                    db.query("UPDATE users SET token = ? WHERE user_id = ?", [token, data.user_id], (err) => {
                        if (err) {
                            result({error: true, reason: err});
                        } else {
                            result({valid: true, result: resultOnline[0]});
                        }
                    });
                } else {
                    result({valid: false, result: "Your account has not been activated"});
                }
            });
        } else {
            result({valid: false, result: "Wrong email or password"});

        }

    });
}

// Token du user
export const getUserByToken = (token, result) => {
    db.query("SELECT user_id, role FROM users WHERE token = ? and online = 1", [token], (err, resultsToken) => {
        if(err) {
            result({error: true, reason: err});
        } else if (!resultsToken[0]) {
            result({valid: false, reason: "token invalid"});
        } else {
            const data = decodeToken(token);
            const role = preserve(resultsToken[0].role);
            if(resultsToken[0].role !== 'admin') {
                db.query("SELECT * FROM users u INNER JOIN " + role + " s on u.user_id = s.user_id WHERE s.user_id = ?", [data.user_id], (err, results) => {
                    if (err) {
                        result({error: true, reason: err});
                    } else {
                        result({valid: true, result: results[0]});
                    }
                })
            } else if(resultsToken[0].role === 'admin') {
                db.query("SELECT * FROM users WHERE user_id = ?", [data.user_id], (err, results) => {
                    if (err) {
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

export const updateOnlineUsers = (id, result) => {
    db.query("update users set online = !online where user_id = ?", [id], (err, result1) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: result1});
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

export const forgotPassword = (email, result) => {
    db.query("select user_id, mail, firstname from users where mail = ?", [email], (err, result1) => {
        if (err) {
            result({error: true, reason: err});
        } else if (result1[0] !== undefined) {
            const data = result1[0];
            const password = generatePassword();
            const templateRegister = `
                <h3>Bonjour ${data.firstname},</h3>
                <p>Vous avez oublié votre mot de passe.</p>
                <p>Pour vous connecter, voici vos identifiants.</p>
                <p>Email : ${data.mail}</p>    
                <p>Mot de passe : ${password.pwd_visible}</p> 
                <p>Vous pouvez vous connecter <a href="http://localhost:8081/login">ici</a></p>
                <p>Cordialement</p>
                <p><u>LoyaltyCard</u></p>
            `; //FIXME changer l'adresse du lien
            db.query("update users set password = ? where user_id = ?", [password.pwd_hash, data.user_id], (err) => {
                if (err) {
                    result({error: true, reason: err});
                } else {
                    sendEmail(data.mail, "Mot de passe oublié", templateRegister);
                    result({valid: true, result: "OK"});
                }
            });
        }
    });
}
