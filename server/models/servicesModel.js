// import connection
import db from "../config/database.js";


// Get All Services
export const getServices = (result) => {
    db.query("SELECT * FROM services ser INNER JOIN sellers sel INNER JOIN WHERE ser.seller_id = sel.seller_id", (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Get Single Services
export const getServicesById = (id, result) => {
    db.query("SELECT * FROM services WHERE service_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Insert Services to Database
export const insertServices = (data, result) => {
    db.query("INSERT INTO services SET ?", [data], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Update Services to Database
export const updateServicesById = (data, id, result) => {
    db.query("UPDATE services SET name = ?, price = ?, reduction = ? WHERE service_id = ?", [data.name, data.price, data.reduction, id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Delete Services to Database
export const deleteServicesById = (id, result) => {
    db.query("DELETE FROM services WHERE good_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}