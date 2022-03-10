// import connection
import db from "../config/database.js";


// Get All Warehouses
export const getWarehouses = (result) => {
    db.query("SELECT * FROM warehouses", (err, results) => {
        if(err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Get Single Warehouses
export const getWarehousesById = (id, result) => {
    db.query("SELECT * FROM warehouses WHERE warehouse_id = ?", [id], (err, results) => {
        if(err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Insert Warehouses to Database
export const insertWarehouses = (data, result) => {
    db.query("INSERT INTO warehouses SET ?", [data], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else if (results.affectedRows !== 0) {
            result({valid: true, result: "Colonne ajoutée"});
        }
    });
}

// Update Warehouses to Database
export const updateWarehousesById = (data, id, result) => {
    db.query("UPDATE warehouses SET name = ? /* TODO */, warehouse_id = ?", [data.name /* TODO */, id], (err, results) => {
        if(err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Delete Warehouses to Database
export const deleteWarehousesById = (id, result) => {
    db.query("DELETE FROM warehouses WHERE warehouse_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else if (results.affectedRows !== 0) {
            result({valid: true, result: "Colonne supprimée"});
        } else {
            result({valid: false, reason: "Colonne non supprimée ou inexistante"});
        }
    });
}
