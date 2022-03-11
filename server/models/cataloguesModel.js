// import connection
import db from "../config/database.js";


// Get All Catalogues
export const getCatalogues = (result) => {
    db.query("SELECT * FROM catalogues", (err, results) => {
        if(err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Get Single Catalogues
export const getCataloguesById = (id, result) => {
    db.query("SELECT * FROM catalogues WHERE catalogue_id = ?", [id], (err, results) => {
        if(err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Insert Catalogues to Database
export const insertCatalogues = (data, result) => {
    db.query("INSERT INTO catalogues SET ?", [data], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else if (results.affectedRows !== 0) {
            result({valid: true, result: "Colonne ajoutée"});
        }
    });
}

// Update Catalogues to Database
export const updateCataloguesById = (data, id, result) => {
    db.query("UPDATE catalogues SET name = ? /* TODO */, catalogue_id = ?", [data.name /* TODO */, id], (err, results) => {
        if(err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Delete Catalogues to Database
export const deleteCataloguesById = (id, result) => {
    db.query("DELETE FROM catalogues WHERE catalogue_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else if (results.affectedRows !== 0) {
            result({valid: true, result: "Colonne supprimée"});
        } else {
            result({valid: false, reason: "Colonne non supprimée ou inexistante"});
        }
    });
}
