// import connection
import db, {encodeToken, generatePassword} from "../config/database.js";
import {sendEmail} from "../mails/mails.js";


// Get All Companies
export const getCompanies = (result) => {
    db.query("SELECT * FROM users u INNER JOIN companies c WHERE u.user_id = c.user_id", (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Get Single Companies
export const getCompaniesById = (id, result) => {
    db.query("SELECT * FROM companies INNER JOIN users u on companies.user_id = u.user_id WHERE company_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Insert Companies to Database
export const insertCompanies = (data, result) => {
    db.query("SELECT user_id FROM users WHERE mail = ?", [data.mail], (err, resultsEmail) => {
        if(err) {
            result(err);
        } else if(resultsEmail[0]) {
            result({valid: false, result: "Email already used"});
        } else {
            db.query("SELECT company_id FROM companies WHERE company = ?", [data.nameCompany], (err, resultCompany) => {
                if(err) {
                    result({error: true, reason: err});
                } else if(resultCompany[0]) {
                    result({valid: false, result: "Company already created"});
                } else {
                    const password = generatePassword();
                    db.query("INSERT INTO users(firstname, lastname, mail, password, role) VALUE(?, ?, ?, ?, 'companies')", [data.firstname, data.lastname, data.mail, password.pwd_hash], (err, resultsUsers) => {
                        if (err) {
                            result({error: true, reason: err});
                        } else if (resultsUsers.insertId) {
                            const user_id = resultsUsers.insertId;
                            const token = encodeToken({user_id: user_id, role: data.role});
                            db.query("UPDATE users set token = ? WHERE user_id = ?", [token, user_id], (err) => {
                                if(err) {
                                    result({error: true, reason: err});
                                } else {
                                    db.query("INSERT INTO companies(company, user_id) VALUES(?, ?)", [data.nameCompany, user_id], (err, results) => {
                                        if (err) {
                                            result({error: true, reason: err});
                                        } else if(results.insertId) {
                                            const templateRegister = `
                                                <h3>Bonjour ${data.firstname},</h3>
                                                <p>Notre administration a créé un compte avec votre email.</p>
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
                            });
                        }
                    });
                }
            });
        }
    })
}

// Update Companies to Database
export const updateCompaniesById = (data, id, result) => {
    const comp = {
        company: data.company
    };

    data.country = data.countries;
    delete data.countries;
    delete data.nameCompany;

    db.query("UPDATE users SET ? WHERE user_id = ?", [data, id], (err) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            db.query("UPDATE companies SET ? WHERE user_id = ?", [comp, id], (err, results) => {
                if (err) {
                    result({error: true, reason: err});
                } else {
                    result({valid: true, result: results});
                }
            });
        }
    });
}

// Delete Companies to Database
export const deleteCompaniesById = (id, result) => {
    db.query("DELETE FROM companies WHERE company_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}
