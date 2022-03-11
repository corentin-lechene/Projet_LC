// import connection
import db from "../config/database.js";


// Get All Categories
export const getCategories = (result) => {
    db.query("SELECT * FROM categories", (err, results) => {
        if(err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Get Single Categories
export const getCategoriesById = (id, result) => {
    db.query("SELECT * FROM categories WHERE categorie_id = ?", [id], (err, results) => {
        if(err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Insert Categories to Database
export const insertCategories = (data, result) => {
    db.query("INSERT INTO categories SET ?", [data], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else if (results.affectedRows !== 0) {
            result({valid: true, result: "Colonne ajoutée"});
        }
    });
}

// Update Categories to Database
export const updateCategoriesById = (data, id, result) => {
    db.query("UPDATE categories SET name = ? /* TODO */, categorie_id = ?", [data.name /* TODO */, id], (err, results) => {
        if(err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Delete Categories to Database
export const deleteCategoriesById = (id, result) => {
    db.query("DELETE FROM categories WHERE categorie_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else if (results.affectedRows !== 0) {
            result({valid: true, result: "Colonne supprimée"});
        } else {
            result({valid: false, reason: "Colonne non supprimée ou inexistante"});
        }
    });
}
