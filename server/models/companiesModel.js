// import connection
import db from "../config/database.js";


// Get All Companies
export const getCompanies = (result) => {
    db.query("SELECT * FROM companies INNER JOIN users u on companies.user_id = u.user_id", (err, results) => {
        if(err) {
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Get Single Companies
export const getCompaniesById = (id, result) => {
    db.query("SELECT * FROM companies INNER JOIN users u on companies.user_id = ?", [id], (err, results) => {
        if(err) {
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });
}

// Insert Companies to Database
export const insertCompanies = (data, result) => {
    db.query("INSERT INTO companies SET ?", [data], (err, results) => {
        if(err) {
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Update Companies to Database
export const updateCompaniesById = (data, id, result) => {
    db.query("UPDATE companies SET name = ? /* TODO */, id = ?", [data.name /* TODO */, id], (err, results) => {
        if(err) {
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Delete Companies to Database
export const deleteCompaniesById = (id, result) => {
    db.query("DELETE FROM companies WHERE companie_id = ?", [id], (err, results) => {
        if(err) {
            result(err, null);
        } else {
            result(null, results);
        }
    });
}
