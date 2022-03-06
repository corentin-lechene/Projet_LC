// import connection
import db from "../config/database.js";


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
    db.query("SELECT * FROM companies INNER JOIN users u on companies.user_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Insert Companies to Database
export const insertCompanies = (data, result) => {
    db.query("INSERT INTO companies SET ?", [data], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Update Companies to Database
export const updateCompaniesById = (data, id, result) => {
    db.query("UPDATE companies SET name = ? /* TODO */, id = ?", [data.name /* TODO */, id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Delete Companies to Database
export const deleteCompaniesById = (id, result) => {
    db.query("DELETE FROM companies WHERE companie_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}
