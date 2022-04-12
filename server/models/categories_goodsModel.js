// import connection
import db from "../config/database.js";


// Get All Categories_goods
export const getCategories_goods = (result) => {
    db.query("SELECT * FROM categories_goods INNER JOIN categories c on categories_goods.category_id = c.category_id", (err, results) => {
        if(err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Get Single Categories_goods
export const getCategories_goodsById = (id, result) => {
    db.query("SELECT * FROM categories_goods INNER JOIN categories c on categories_goods.category_id = c.category_id WHERE categories_good_id = ?", [id], (err, results) => {
        if(err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Insert Categories_goods to Database
export const insertCategories_goods = (data, result) => {
    db.query("INSERT INTO categories_goods SET ?", [data], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else if (results.affectedRows !== 0) {
            result({valid: true, result: "Colonne ajoutée"});
        }
    });
}

// Update Categories_goods to Database
export const updateCategories_goodsById = (data, id, result) => {
    db.query("UPDATE categories_goods SET name = ? /* TODO */, categories_good_id = ?", [data.name /* TODO */, id], (err, results) => {
        if(err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Delete Categories_goods to Database
export const deleteCategories_goodsById = (id, result) => {
    db.query("DELETE FROM categories_goods WHERE categories_good_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else if (results.affectedRows !== 0) {
            result({valid: true, result: "Colonne supprimée"});
        } else {
            result({valid: false, reason: "Colonne non supprimée ou inexistante"});
        }
    });
}
