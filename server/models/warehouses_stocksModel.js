// import connection
import db from "../config/database.js";


// Get All Warehouses_stocks
export const getWarehouses_stocks = (result) => {
    db.query("SELECT * FROM warehouses_stocks", (err, results) => {
        if(err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Get Single Warehouses_stocks
export const getWarehouses_stocksById = (id, result) => {
    db.query("SELECT * FROM warehouses_stocks WHERE warehouses_stock_id = ?", [id], (err, results) => {
        if(err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Insert Warehouses_stocks to Database
export const insertWarehouses_stocks = (data, result) => {
    db.query("INSERT INTO warehouses_stocks(warehouse_id, good_id, stock) value(?, ?, ?)", [data.warehouses, data.goods, data.quantity], (err) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: "Colonne ajoutée"});
        }
    });
}

// Update Warehouses_stocks to Database
export const updateWarehouses_stocksById = (data, id, result) => {
    db.query("UPDATE warehouses_stocks SET name = ? /* TODO */, warehouses_stock_id = ?", [data.name /* TODO */, id], (err, results) => {
        if(err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Delete Warehouses_stocks to Database
export const deleteWarehouses_stocksById = (id, result) => {
    db.query("DELETE FROM warehouses_stocks WHERE warehouses_stock_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else if (results.affectedRows !== 0) {
            result({valid: true, result: "Colonne supprimée"});
        } else {
            result({valid: false, reason: "Colonne non supprimée ou inexistante"});
        }
    });
}
