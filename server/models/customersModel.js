// import connection
import db, {encodeToken, generatePassword} from "../config/database.js";
import {sendEmail} from "../mails/mails.js";

// Get All Customers
export const getCustomers = (result) => {
    db.query("SELECT *, DATE_FORMAT(birthdate,'%d/%m/%Y') AS birthDay FROM users u INNER JOIN customers cu INNER JOIN companies co WHERE u.user_id = cu.user_id AND cu.company_id = co.company_id", (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

export const getCustomersByCompanyId = (id, result) => {
    db.query("SELECT * FROM customers INNER JOIN users u on customers.user_id = u.user_id WHERE company_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Get Single Customers
export const getCustomersById = (id, result) => {
    db.query("SELECT * FROM users INNER JOIN customers c on users.user_id = c.user_id WHERE c.user_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Insert Customers to Database
export const insertCustomers = (data, result) => {
    for (const dataKey in data) {
        if(data[dataKey] === "" || data[dataKey] === null)
            result({valid: false, result: "row empty"});
    }
    db.query("SELECT user_id FROM users WHERE mail = ?", [data.mail], (err, resultsEmail) => {
        if(err) {
            result(err);
        } else if(resultsEmail[0]) {
            result({valid: false, result: "Email already used"});
        } else {
            const password = generatePassword();
            db.query("INSERT INTO users(firstname, lastname, mail, password, role) VALUE(?, ?, ?, ?, 'customers')", [data.firstname, data.lastname, data.mail, password.pwd_hash], (err, resultsUsers) => {
                if (err) {
                    result({error: true, reason: err});
                } else if (resultsUsers.insertId) {
                    const user_id = resultsUsers.insertId;
                    const token = encodeToken({user_id: user_id, role: data.role});
                    db.query("UPDATE users set token = ? WHERE user_id = ?", [token, user_id], (err) => {
                        if (err) {
                            result({error: true, reason: err});
                        } else {
                            db.query("INSERT INTO cards(code, points) VALUES(?, ?)", [token, 0], (err, resultsCards) => {
                                if (err) {
                                    result({error: true, reason: err});
                                } else if (resultsCards.insertId) {
                                    const card_id = resultsCards.insertId;
                                    db.query("INSERT INTO customers(card_id, company_id, user_id) VALUES(?, ?, ?)", [card_id, data.companies, user_id], (err, results) => {
                                        if (err) {
                                            result({error: true, reason: err});
                                        } else if (results.insertId) {
                                            const templateRegister = `
                                        <h3>Bonjour ${data.firstname},</h3>
                                        <p>Un compte a été créé par votre entreprise.</p>
                                        <p>Pour vous connecter, voici vos identifiants.</p>
                                        <p>Email : ${data.mail}</p>    
                                        <p>Email : ${password.pwd_visible}</p> 
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
                            })
                        }
                    });
                }
            });
        }
    });
}

// Update Customers to Database
export const updateCustomersById = (data, id, result) => {
    db.query("UPDATE customers SET name = ? /* TODO */, id = ?", [data.name /* TODO */, id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Delete Customers to Database
export const deleteCustomersById = (id, result) => {
    db.query("DELETE FROM customers WHERE customer_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
    } else if (results.affectedRows !== 0) {
        result({valid: true, result: "Colonne supprimée"});
    } else {
        result({valid: false, reason: "Colonne non supprimée ou inexistante"});
    }
    });
}
