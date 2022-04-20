// import connection
import db, {encodeToken, generatePassword} from "../config/database.js";
import {sendEmail} from "../mails/mails.js";


// Get All Staffs
export const getStaffs = (result) => {
    db.query("SELECT * FROM users u INNER JOIN staffs s WHERE u.user_id = s.user_id", (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Get Single Staffs
export const getStaffsById = (id, result) => {
    db.query("SELECT * FROM staffs INNER JOIN users u on staffs.user_id = u.user_id WHERE staffs.user_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Insert Staffs to Database
export const insertStaffs = (data, result) => {
    db.query("SELECT user_id FROM users WHERE mail = ?", [data.mail], (err, resultsEmail) => {
        if(err) {
            result(err);
        } else if(resultsEmail[0]) {
            result({valid: false, result: "Email already used"});
        } else {
            const password = generatePassword();
            db.query("INSERT INTO users(firstname, lastname, mail, password, role) VALUE(?, ?, ?, ?, 'staffs')", [data.firstname, data.lastname, data.mail, password.pwd_hash], (err, resultsUsers) => {
                if (err) {
                    result({error: true, reason: err});
                } else if (resultsUsers.insertId) {
                    const user_id = resultsUsers.insertId;
                    const token = encodeToken({user_id: user_id, role: data.role});
                    db.query("UPDATE users set token = ? WHERE user_id = ?", [token, user_id], (err) => {
                        if (err) {
                            result({error: true, reason: err});
                        } else {
                            db.query("INSERT INTO staffs(job, user_id) VALUES(?, ?)", [data.job, user_id], (err, results) => {
                                if (err) {
                                    result({error: true, reason: err});
                                } else {
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
                                    result({valid: true, result: results[0]});
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}

// Update Staffs to Database
export const updateStaffsById = (data, id, result) => {
    db.query("UPDATE staffs SET name = ? /* TODO */, id = ?", [data.name /* TODO */, id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Delete Staffs to Database
export const deleteStaffsById = (id, result) => {
    db.query("DELETE FROM staffs WHERE staff_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}
