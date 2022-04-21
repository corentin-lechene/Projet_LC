// import connection
import db, {getValueImage} from "../config/database.js";
import fs from "fs-extra";


// Get All Services
export const getServices = (result) => {
    db.query("select * from services inner join sellers s on services.seller_id = s.seller_id", (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Get Single Services
export const getServicesById = (id, result) => {
    db.query("select * from services inner join categories_services cs on services.service_id = cs.service_id inner join categories c on cs.category_id = c.category_id inner join sellers s on services.seller_id = s.seller_id inner join users u on s.user_id = u.user_id where services.service_id = ?", [id], (err, resultsService) => {
        if (err) {
            result({error: true, reason: err});
        } else if (resultsService[0] !== "undefined") {
            db.query("select * from services inner join sellers s on services.seller_id = s.seller_id where services.service_id = ?", [id], (err, results) => {
                if (err) {
                    result({error: true, reason: err});
                } else {
                    result({valid: true, result: results});
                }
            });
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
    db.query("UPDATE services SET name = ?, price = ?, reduction = ?, quantity = ? WHERE service_id = ?", [data.nameService, data.price, data.reduction, data.quantity, id], (err, results) => {
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