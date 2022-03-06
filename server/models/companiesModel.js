// import connection
import db, {generatePassword} from "../config/database.js";


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
    const password = generatePassword();
    db.query("INSERT INTO users(firstname, lastname, mail, password, role) VALUE(?, ?, ?, ?, 'companies')", [data.firstname, data.lastname, data.mail, password.pwd_hash], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else if (results.insertId) {
            db.query("INSERT INTO companies(company, user_id) VALUES(?, ?)", [data.company, results.insertId], (err, results) => {
                if (err) {
                    result({error: true, reason: err});
                } else {
                    result({valid: true, result: results[0]});
                }
            })
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
