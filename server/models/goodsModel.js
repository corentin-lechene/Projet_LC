// import connection
import db from "../config/database.js";


// Get All Goods
export const getGoods = (result) => {
    db.query("SELECT * FROM goods", (err, results) => {
        if(err) {
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Get Single Goods
export const getGoodsById = (id, result) => {
    db.query("SELECT * FROM goods WHERE good_id = ?", [id], (err, results) => {
        if(err) {
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });
}

// Insert Goods to Database
export const insertGoods = (data, result) => {
    db.query("INSERT INTO goods SET ?", [data], (err, results) => {
        if(err) {
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Update Goods to Database
export const updateGoodsById = (data, id, result) => {
    db.query("UPDATE goods SET name = ?, price = ?, reduction = ? WHERE good_id = ?", [data.name, data.price, data.reduction, id], (err, results) => {
        if(err) {
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Delete Goods to Database
export const deleteGoodsById = (id, result) => {
    db.query("DELETE FROM goods WHERE good_id = ?", [id], (err, results) => {
        if(err) {
            result(err, null);
        } else {
            result(null, results);
        }
    });
}