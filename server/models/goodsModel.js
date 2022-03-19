// import connection
import db from "../config/database.js";


// Get All Goods
export const getGoods = (result) => {
    db.query("SELECT * FROM goods INNER JOIN categories_goods cg on goods.good_id = cg.good_id", (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Get Single Goods
export const getGoodsById = (id, result) => {
    db.query("SELECT * FROM goods INNER JOIN sellers s on goods.seller_id = s.seller_id INNER JOIN users u on s.user_id = u.user_id WHERE good_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results[0]});
        }
    });
}

// Get Goods by seller
export const getGoodsBySellerId = (id, result) => {
    db.query("SELECT * FROM goods INNER JOIN sellers s on goods.seller_id = s.seller_id INNER JOIN users u on s.user_id = u.user_id WHERE s.seller_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Insert Goods to Database
export const insertGoods = (data, result) => {
    db.query("INSERT INTO goods SET ?", [data], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Update Goods to Database
export const updateGoodsById = (data, id, result) => {
    db.query("UPDATE goods SET name = ?, price = ?, reduction = ? WHERE good_id = ?", [data.name, data.price, data.reduction, id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Delete Goods to Database
export const deleteGoodsById = (id, result) => {
    db.query("DELETE FROM goods WHERE good_id = ?", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}