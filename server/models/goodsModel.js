// import connection
import db from "../config/database.js";
import fs from 'fs-extra';

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
    if(data.price <= 0) {
        result({valid: false, result: "Price cant be negative"});
    }

    const ext = data.file[0].match(/jpeg|png|jpg/)[0];
    data.file.shift(); // supprime le titre du fichier
    const binImage = new Buffer((data.file.join('')).replace(/data:image\/(jpeg|jpg|png);base64,/, ""), 'base64');
    const category_id = data.goodCategories;

    data.name = data.nameGood;
    data.seller_id = data.sellers;
    delete data.nameGood;
    delete data.sellers;
    delete data.goodCategories; // no need for goods but for categories_goods
    delete data.file; //no need data of image

    if(ext !== ('jpeg' && 'png' && 'jpg')) {
        result({valid: false, result: "Extension incompatible"});
    } else {
        db.query("INSERT INTO goods SET ?", [data], (err, resultsInsert) => {
            if (err) {
                result({error: true, reason: err});
            } else {
                const good_id = resultsInsert.insertId;
                const path = "../src/assets/images/product/img-"+ data.seller_id +"-"+ good_id +"."+ ext;
                db.query("UPDATE goods SET image = ? WHERE good_id = ?", ["img-"+ data.seller_id +"-"+ good_id +"."+ ext, good_id], (err) => {
                    if (err) {
                        result({error: true, reason: err});
                    } else {
                        db.query("INSERT INTO categories_goods(category_id, good_id) VALUE(?, ?)", [category_id, good_id], (err) => {
                            if (err) {
                                result({error: true, reason: err});
                            } else {
                                fs.outputFile(path, binImage);
                                result({valid: true, result: "Colonne ajoutée"});
                            }
                        });
                    }
                });
            }
        });
    }
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