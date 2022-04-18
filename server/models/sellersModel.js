// import connection
import db, {encodeToken, generatePassword} from "../config/database.js";
import {sendEmail} from "../mails/mails.js";


// Get All Staffs
export const getSellers = (result) => {
    db.query("SELECT * FROM sellers INNER JOIN users ON sellers.user_id = users.user_id", (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Get Single Sellers
export const getSellersById = (id, result) => {
    db.query("SELECT * FROM sellers INNER JOIN users u on sellers.user_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Insert Sellers to Database
export const insertSellers = (data, result) => {
    db.query("SELECT user_id FROM users WHERE mail = ?", [data.mail], (err, resultsEmail) => {
        if(err) {
            result(err);
        } else if(resultsEmail[0]) {
            result({valid: false, result: "Email already used"});
        } else {
            db.query("SELECT seller_id FROM sellers WHERE company = ?", [data.nameCompany], (err, resultCompany) => {
                if (err) {
                    result({error: true, reason: err});
                } else if (resultCompany[0]) {
                    result({valid: false, result: "Company already created"});
                } else {
                    const password = generatePassword();
                    db.query("INSERT INTO users(firstname, lastname, mail, password, role) VALUE(?, ?, ?, ?, 'sellers')", [data.firstname, data.lastname, data.mail, password.pwd_hash], (err, resultsUsers) => {
                        if (err) {
                            result({error: true, reason: err});
                        } else {
                            const user_id = resultsUsers.insertId;
                            const token = encodeToken({user_id: user_id, role: data.role});
                            db.query("UPDATE users set token = ? WHERE user_id = ?", [token, user_id], (err) => {
                                if (err) {
                                    result({error: true, reason: err});
                                } else {
                                    db.query("INSERT INTO sellers(status, company, user_id) VALUES(?, ?, ?)", [data.status, data.nameCompany, user_id], (err, results) => {
                                        if (err) {
                                            result({error: true, reason: err});
                                        } else if (results.insertId) {
                                            const templateRegister = `
                                                <h3>Bonjour ${data.firstname},</h3>
                                                <p>Notre administration a créé un compte avec votre email.</p>
                                                <p>Pour vous connecter, voici vos identifiants.</p>
                                                <p>Email : ${data.mail}</p>    
                                                <p>Password : ${password.pwd_visible}</p> 
                                                <p>Vous pouvez vous connecter <a href="http://localhost:8081/login">ici</a></p>
                                                <p>Cordialement</p>
                                                <p><u>LoyaltyCard</u></p>
                                            `; //FIXME changer l'adresse du lien
                                            sendEmail(data.mail, "Inscription sur LoyaltyCard", templateRegister);
                                            result({valid: true, result: "OK"});
                                        } else {
                                            result({valid: false, result: results});
                                        }
                                    })
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}

// Update Sellers to Database
    export const updateSellersById = (data, id, result) => {
        db.query("UPDATE sellers SET name = ? /* TODO */, id = ?", [data.name /* TODO */, id], (err, results) => {
            if (err) {
                result({error: true, reason: err});
            } else {
                result({valid: true, result: results});
            }
        });
    }

// Delete Sellers to Database
    export const deleteSellersById = (id, result) => {
        db.query("DELETE FROM sellers WHERE user_id = ?", [id], (err, results) => {
            if (err) {
                result({error: true, reason: err});
            } else {
                result({valid: true, result: results});
            }
        });
    }
