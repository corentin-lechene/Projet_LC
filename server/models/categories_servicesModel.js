// import connection
import db from "../config/database.js";


// Get All Categories_services
export const getCategories_services = (result) => {
    db.query("SELECT * from categories where type = 'services' or type = 'biens et services'", (err, results) => {
        if(err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Get Single Categories_services
export const getCategories_servicesById = (id, result) => {
    db.query("SELECT * FROM categories_services INNER JOIN categories c on categories_services.category_id = c.category_id WHERE categories_service_id = ?", [id], (err, results) => {
        if(err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Insert Categories_services to Database
export const insertCategories_services = (data, result) => {
    db.query("INSERT INTO categories_services SET ?", [data], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else if (results.affectedRows !== 0) {
            result({valid: true, result: "Colonne ajoutée"});
        }
    });
}


// Delete Categories_services to Database
export const deleteCategories_servicesById = (id, result) => {
    db.query("DELETE FROM categories_services WHERE categories_service_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else if (results.affectedRows !== 0) {
            result({valid: true, result: "Colonne supprimée"});
        } else {
            result({valid: false, reason: "Colonne non supprimée ou inexistante"});
        }
    });
}
