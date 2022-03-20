// import connection
import db from "../config/database.js";


// Get All Carts_goods
export const getCarts_goods = (result) => {
    db.query("SELECT * FROM carts_goods", (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Get Single Carts_goods
export const getCarts_goodsById = (id, result) => {
    db.query("SELECT * FROM carts_goods WHERE carts_good_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Insert Carts_goods to Database
export const insertCarts_goods = (data, result) => {
    db.query("SELECT cart_id from carts WHERE customer_id = ? AND status = 0", [data.customer_id], (err, resultsCarts) => {
        if (err) {
            result({error: true, reason: err});
        } else if (resultsCarts[0] !== undefined) {
            db.query("SELECT cart_good_id, cart_quantity from carts_good WHERE cart_id = ? AND good_id = ?", [resultsCarts[0].cart_id, data.good_id], (err, resultsCartsGood) => {
                if (err) {
                    result({error: true, reason: err});
                } else if (resultsCartsGood[0] !== undefined) {
                    db.query("UPDATE carts_good SET cart_quantity = ? WHERE cart_good_id = ?", [resultsCartsGood[0].cart_quantity + 1, resultsCartsGood[0].cart_good_id], (err, results) => {
                        if (err) {
                            result({error: true, reason: err});
                        } else {
                            result({valid: true, result: results[0]});
                        }
                    });

                } else {
                    db.query("INSERT INTO carts_good(cart_id, cart_quantity, good_id) VALUES(?, 1, ?)", [resultsCarts[0].cart_id, data.good_id], (err, results) => {
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
                } else if (resultsCarts[0].insertId) {
                    db.query("INSERT INTO carts_good(cart_id, cart_quantity, good_id) VALUES(?, 1, ?)", [resultsCarts[0].insertId, data.good_id], (err, results) => {
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

// Update Carts_goods to Database
export const updateCarts_goodsById = (quantity, id, result) => {
    db.query("UPDATE carts_good SET cart_quantity = ? WHERE cart_good_id = ?", [quantity, id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Delete Carts_goods to Database
export const deleteCarts_goodsById = (id, result) => {
    db.query("DELETE FROM carts_good WHERE cart_good_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else if (results.affectedRows !== 0) {
            result({valid: true, result: "Colonne supprimée"});
        } else {
            result({valid: false, reason: "Colonne non supprimée ou inexistante"});
        }
    });
}
