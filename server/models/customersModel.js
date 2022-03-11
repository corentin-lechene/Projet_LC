// import connection
import db/*, {generatePassword}*/ from "../config/database.js";
//import {generateToken} from "../my-functions.js";
import nodemailer from "nodemailer";

// Get All Customers
export const getCustomers = (result) => {
    db.query("SELECT *, DATE_FORMAT(birthdate,'%d/%m/%Y') AS birthDay FROM users INNER JOIN customers c on users.user_id = c.user_id WHERE users.role = 'customers'", (err, results) => {
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
    const password = "msteopseas";
    db.query("INSERT INTO users(firstname, lastname, mail, password, role) VALUE(?, ?, ?, ?, 'customers')", [data.firstname, data.lastname, data.mail, password], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else if (results.insertId) {
            const user_id = results.insertId;
            db.query("INSERT INTO customers(company_id, user_id) VALUES(?, ?)", [data.company_id, user_id], (err) => {
                if (err) {
                    result({error: true, reason: err});
                } else {
                    const code = "";//generateToken({user_id: user_id, role: data.role});
                    db.query("INSERT INTO cards(code, points) VALUES(?, ?)", [code, 0], (err) => {
                        if (err) {
                            result({error: true, reason: err});
                        } else {

                            let transporter = nodemailer.createTransport({
                                service: `${process.env.VUE_APP_MAIL_SERVICE}`,
                                auth: {
                                    user: `${process.env.VUE_APP_MAIL_USER}`,
                                    pass: `${process.env.VUE_APP_MAIL_PWD}`
                                }
                            });

                            let mailOptions = {
                                from: `${process.env.VUE_APP_MAIL_USER}`,
                                to: data.mail,
                                subject: "Inscription à LoyalyCard",
                                text: `Bonjour ${data.firstname},\nUn compte a été créé par votre entreprise.\nVos identifiants: \nemail: ${data.mail}\nmot de passe: ${password}.`,
                            };

                            transporter.sendMail(mailOptions, (err, info) => {
                                if(err) {
                                    console.error(err);
                                } else {
                                    console.log("email sent : ", info.response);
                                }
                            });

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
