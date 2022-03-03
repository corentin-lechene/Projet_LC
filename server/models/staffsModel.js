// import connection
import db from "../config/database.js";


// Get All Staffs
export const getStaffs = (result) => {
    db.query("SELECT * FROM staffs INNER JOIN users u on staffs.user_id = u.user_id", (err, results) => {
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
    db.query("INSERT INTO staffs SET ?", [data], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
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
