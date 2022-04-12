// import connection
import db from "../config/database.js";


// Get All Categories
export const getCategories = (result) => {
    db.query("SELECT * FROM categories", (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Get Single Categories
export const getCategoriesById = (id, result) => {
    db.query("SELECT * FROM categories WHERE category_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Insert Categories to Database
export const insertCategories = (data, result) => {
    data.title = data.nameCategory;
    delete data.nameCategory;


    db.query("SELECT category_id FROM categories WHERE title = ?", [data.nameWareHouse], (err, resultsName) => {
        if (err) {
            result({error: true, reason: err});
        } else if (resultsName[0]) {
            result({valid: false, result: "Category already created"});
        } else {
            db.query("INSERT INTO categories SET ?", [data], (err) => {
                if (err) {
                    result({error: true, reason: err});
                } else {
                    result({valid: true, result: "Colonne ajoutée"});
                }
            })
        }
    })
}

// Update Categories to Database
export const updateCategoriesById = (data, id, result) => {
    db.query("UPDATE categories SET name = ? /* TODO */, category_id = ?", [data.name /* TODO */, id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Delete Categories to Database
export const deleteCategoriesById = (id, result) => {
    db.query("DELETE FROM categories WHERE category_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else if (results.affectedRows !== 0) {
            result({valid: true, result: "Colonne supprimée"});
        } else {
            result({valid: false, reason: "Colonne non supprimée ou inexistante"});
        }
    });
}
