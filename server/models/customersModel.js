// import connection
import db, {generatePassword} from "../config/database.js";
import {generateToken} from "../my-functions.js";
// import nodemailer from "nodemailer";

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

// Get Single Customers
export const getCustomersById = (id, result) => {
    db.query("SELECT * FROM customers INNER JOIN users u on customers.user_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Insert Customers to Database
export const insertCustomers = (data, result) => {
    const password = generatePassword();
    db.query("INSERT INTO users(firstname, lastname, mail, password, role) VALUE(?, ?, ?, ?, 'customers')", [data.firstname, data.lastname, data.mail, password.pwd_hash], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else if (results.insertId) {
            const user_id = results.insertId;
            db.query("INSERT INTO customers(company_id, user_id) VALUES(?, ?)", [data.company_id, user_id], (err) => {
                if (err) {
                    result({error: true, reason: err});
                } else {
                    const code = generateToken({user_id: user_id, role: data.role});
                    db.query("INSERT INTO cards(code, points) VALUES(?, ?)", [code, 0], (err) => {
                        if (err) {
                            result({error: true, reason: err});
                        } else { /*
                            let transporter = nodemailer.createTransport({
                                pool: true,
                                host: "smtp.live.com",
                                secureConnection: true,
                                port: 465,
                                secure: true, // use TLS
                                auth: {
                                    user: "projetlc.esgi@outlook.fr",
                                    pass: "NE\"`nuVe*(Gu5y2%",
                                },
                                tls: {
                                    secureProtocol: "TLSv1_method"
                                }
                            });

                            transporter.verify((error) => {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log("Server is ready to take our messages");
                                }
                            }); */

                            result({valid: true, result: "tout est ok !"});
                        }
                    })
                }
            })
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
