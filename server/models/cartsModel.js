// import connection
import db from "../config/database.js";


// Get All Carts
export const getCarts = (result) => {
    db.query("select 'services' as cart_name, cs.cart_id, cs.cart_service_id as cart_product_id, cs.cart_quantity, s.service_id as product_id, s.name, s.description, s.price, s.stripe_price, s.reduction, s.image from carts RIGHT JOIN carts_service cs on carts.cart_id = cs.cart_id LEFT JOIN services s on cs.service_id = s.service_id WHERE carts.customer_id = ? UNION select 'goods' as cart_name, cg.cart_id, cg.cart_good_id as cart_product_id, cg.cart_quantity, g.name, g.description, g.price, g.stripe_price, g.reduction, g.image from carts RIGHT JOIN carts_good cg on carts.cart_id = cg.cart_id LEFT JOIN goods g on cg.good_id = g.good_id WHERE carts.customer_id = ?", (err, results) => {
        if(err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Get Single Carts
export const getCartsById = (id, result) => {
    db.query("SELECT * FROM carts WHERE cart_id = ?", [id], (err, results) => {
        if(err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Get Single Carts
export const getCartsByCustomerId = (customer_id, result) => {
    db.query("select 'services' as cart_name, cs.cart_id, cs.cart_service_id as cart_product_id, cs.cart_quantity, s.service_id as product_id, s.name, s.description, s.price, s.stripe_price, s.reduction, s.image from carts RIGHT JOIN carts_service cs on carts.cart_id = cs.cart_id LEFT JOIN services s on cs.service_id = s.service_id WHERE carts.customer_id = ? AND carts.status = FALSE UNION select 'goods' as cart_name, cg.cart_id, cg.cart_good_id as cart_product_id, cg.cart_quantity, g.good_id as product_id, g.name, g.description, g.price, g.stripe_price, g.reduction, g.image from carts RIGHT JOIN carts_good cg on carts.cart_id = cg.cart_id LEFT JOIN goods g on cg.good_id = g.good_id WHERE carts.customer_id = ? AND carts.status = FALSE", [customer_id, customer_id], (err, results) => {
        if(err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Insert Carts to Database
export const insertCarts = (data, result) => {
    db.query("INSERT INTO carts SET ?", [data], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else if (results.affectedRows !== 0) {
            result({valid: true, result: "Colonne ajoutée"});
        }
    });
}

// Update Carts to Database
export const updateCartsById = (data, id, result) => {
    db.query("UPDATE carts SET name = ? /* TODO */, cart_id = ?", [data.name /* TODO */, id], (err, results) => {
        if(err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Delete Carts to Database
export const deleteCartsById = (id, result) => {
    db.query("DELETE FROM carts WHERE cart_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else if (results.affectedRows !== 0) {
            result({valid: true, result: "Colonne supprimée"});
        } else {
            result({valid: false, reason: "Colonne non supprimée ou inexistante"});
        }
    });
}
