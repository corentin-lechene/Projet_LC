// import connection
import db from "../config/database.js";


// Get All Carts_services
export const getCarts_services = (result) => {
    db.query("SELECT * FROM carts_services", (err, results) => {
        if(err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Get Single Carts_services
export const getCarts_servicesById = (id, result) => {
    db.query("SELECT * FROM carts_services WHERE carts_service_id = ?", [id], (err, results) => {
        if(err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Insert Carts_services to Database
export const insertCarts_services = (data, result) => {
    db.query("SELECT cart_id from carts WHERE customer_id = ? AND status = 0", [data.customer_id], (err, resultsCarts) => {
        if (err) {
            result({error: true, reason: err});
        } else if (resultsCarts[0] !== undefined) {
            db.query("SELECT cart_service_id, cart_quantity from carts_service WHERE cart_id = ? AND service_id = ?", [resultsCarts[0].cart_id, data.service_id], (err, resultsCartsService) => {
                if (err) {
                    result({error: true, reason: err});
                } else if (resultsCartsService[0] !== undefined) {
                    db.query("UPDATE carts_service SET cart_quantity = ? WHERE cart_service_id = ?", [resultsCartsService[0].cart_quantity + 1, resultsCartsService[0].cart_service_id], (err, results) => {
                        if (err) {
                            result({error: true, reason: err});
                        } else {
                            result({valid: true, result: results[0]});
                        }
                    });

                } else {
                    db.query("INSERT INTO carts_service(cart_id, cart_quantity, service_id) VALUES(?, 1, ?)", [resultsCarts[0].cart_id, data.service_id], (err, results) => {
                        if (err) {
                            result({error: true, reason: err});
                        } else {
                            result({valid: true, result: results[0]});
                        }
                    });
                }
            });
        } else {
            db.query("INSERT INTO carts(customer_id) VALUES(?)", [data.customer_id], (err, resultsCarts) => {
                if (err) {
                    result({error: true, reason: err});
                } else if (resultsCarts !== undefined) {
                    db.query("INSERT INTO carts_service(cart_id, cart_quantity, service_id) VALUES(?, 1, ?)", [resultsCarts.insertId, data.service_id], (err, results) => {
                        if (err) {
                            result({error: true, reason: err});
                        } else {
                            result({valid: true, result: results[0]});
                        }
                    });
                }
            });
        }
    });
}

// Update Carts_services to Database
export const updateCarts_servicesById = (quantity, id, result) => {
    db.query("UPDATE carts_service SET cart_quantity = ? WHERE cart_service_id = ?", [quantity, id], (err, results) => {
        if(err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Delete Carts_services to Database
export const deleteCarts_servicesById = (id, result) => {
    db.query("DELETE FROM carts_service WHERE cart_service_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else if (results.affectedRows !== 0) {
            result({valid: true, result: "Colonne supprimée"});
        } else {
            result({valid: false, reason: "Colonne non supprimée ou inexistante"});
        }
    });
}
