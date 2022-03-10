// import connection
import db, {generatePassword} from "../config/database.js";


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
    const password = generatePassword();
    db.query("INSERT INTO users(firstname, lastname, mail, password, role) VALUE(?, ?, ?, ?, 'sellers')", [data.firstname, data.lastname, data.mail, password.pwd_hash], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else if (results.insertId) {
            db.query("INSERT INTO sellers(status, company, user_id) VALUES(?, ?, ?)", [data.status, data.company, results.insertId], (err, results) => {
                if (err) {
                    result({error: true, reason: err});
                } else {
                    result({valid: true, result: results[0]});
                }
            })
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
        db.query("DELETE FROM sellers WHERE staff_id = ?", [id], (err, results) => {
            if (err) {
                result({error: true, reason: err});
            } else {
                result({valid: true, result: results});
            }
        });
    }
