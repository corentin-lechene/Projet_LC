// import connection
import db, {getValueImage} from "../config/database.js";
import fs from "fs-extra";


// Get All Services
export const getServices = (result) => {
    db.query("SELECT se.service_id, name, image, description, price, reduction, company, category_service_id FROM services se INNER JOIN sellers s on se.seller_id = s.seller_id INNER JOIN categories_services cs on se.service_id = cs.service_id", (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Get Single Services
export const getServicesById = (id, result) => {
    db.query("SELECT * FROM services INNER JOIN sellers s on services.seller_id = s.seller_id INNER JOIN users u on s.user_id = u.user_id WHERE service_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Get services by seller
export const getServicesBySellerId = (id, result) => {
    db.query("SELECT * FROM services INNER JOIN sellers s on services.seller_id = s.seller_id INNER JOIN users u on s.user_id = u.user_id WHERE s.seller_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Insert Services to Database
export const insertServices = (data, result) => {
    if(data.price <= 0) {
        result({valid: false, result: "Price cant be negative"});
    }

    const image = getValueImage(data.file);
    const category_id = data.categories;

    data.name = data.nameService;
    data.seller_id = data.sellers;

    if(image.ext !== ('jpeg' && 'png' && 'jpg')) {
        result({valid: false, result: "Extension incompatible"});
    } else {
        db.query("INSERT INTO services(name, description, price, seller_id) value(?, ?, ?, ?)", [data.nameService, data.description, data.price, data.sellers], (err, resultsInsert) => {
            if (err) {
                result({error: true, reason: err});
            } else {
                const service_id = resultsInsert.insertId;
                const image_name = "img-"+ data.seller_id +"-"+ service_id +"."+ image.ext;
                const path = "../src/assets/images/product/"+ image_name;
                db.query("UPDATE services SET image = ? WHERE service_id = ?", [image_name, service_id], (err) => {
                    if (err) {
                        result({error: true, reason: err});
                    } else {
                        db.query("INSERT INTO categories_services(category_id, service_id) VALUE(?, ?)", [category_id, service_id], (err) => {
                            if (err) {
                                result({error: true, reason: err});
                            } else {
                                fs.outputFile(path, image.bin);
                                result({valid: true, result: "Colonne ajoutée"});
                            }
                        });
                    }
                });
            }
        });
    }
}

// Update Services to Database
export const updateServicesById = (data, id, result) => {
    db.query("UPDATE services SET name = ?, price = ?, reduction = ? WHERE service_id = ?", [data.name, data.price, data.reduction, id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Delete Services to Database
export const deleteServicesById = (id, result) => {
    db.query("DELETE FROM services WHERE service_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}