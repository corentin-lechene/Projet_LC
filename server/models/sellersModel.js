// import connection
import db from "../config/database.js";


// Get All Staffs
export const getSellers = (result) => {
    db.query("SELECT * FROM users u INNER JOIN sellers s WHERE u.user_id = s.user_id", (err, results) => {
        if (err) {
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Get Single Sellers
export const getSellersById = (id, result) => {
    db.query("SELECT * FROM sellers INNER JOIN users u on sellers.user_id = ?", [id], (err, results) => {
        if (err) {
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });
}

// Insert Sellers to Database
export const insertSellers = (data, result) => {
    db.query("INSERT INTO sellers SET ?", [data], (err, results) => {
        if (err) {
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Update Sellers to Database
export const updateSellersById = (data, id, result) => {
    db.query("UPDATE sellers SET name = ? /* TODO */, id = ?", [data.name /* TODO */, id], (err, results) => {
        if (err) {
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Delete Sellers to Database
export const deleteSellersById = (id, result) => {
    db.query("DELETE FROM sellers WHERE staff_id = ?", [id], (err, results) => {
        if (err) {
            result(err, null);
        } else {
            result(null, results);
        }
    });
}
