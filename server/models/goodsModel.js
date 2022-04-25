// import connection
import db, {getValueImage} from "../config/database.js";
import fs from 'fs-extra';

// Get All Goods
export const getGoods = (result) => {
    db.query("select * from goods inner join sellers s on goods.seller_id = s.seller_id", (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

export const getGoodsOnline = (result) => {
    db.query("select * from goods left join sellers s on goods.seller_id = s.seller_id where online = true", (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Get Single Goods
export const getGoodsById = (id, result) => {
    db.query("select goods.good_id, name, description, price, image, reduction,\n" +
        "       cg.category_good_id,\n" +
        "       c.category_id, c.title, c.type, c.content,\n" +
        "       s.seller_id, s.status, s.company,\n" +
        "       (select sum(stock) as totalStock from warehouses_stocks where good_id = ? order by good_id) as totalStock,\n" +
        "       (select stock from warehouses_stocks where warehouses_stocks.good_id = ? limit 1) as stock\n" +
        "       from goods left join categories_goods cg on goods.good_id = cg.good_id left join categories c on cg.category_id = c.category_id left join sellers s on goods.seller_id = s.seller_id where goods.good_id = ?", [id, id, id], (err, resultsGoods) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: resultsGoods[0]});
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

// Get Goods and services by cart
    export const getGoodsOrServicesByCartId = (id, cart_id, result) => {
        db.query("select carts.cart_id,\n" +
            "       carts.customer_id,\n" +
            "       carts.status,\n" +
            "       carts.created_at,\n" +
            "       carts.updated_at,\n" +
            "       'services'         as cart_name,\n" +
            "       cs.cart_service_id as cart_product_id,\n" +
            "       'services'                as cart_name,\n" +
            "       cs.cart_service_id        as cart_product_id,\n" +
            "       cs.cart_quantity,\n" +
            "       s.service_id              as product_id,\n" +
            "       s.name,\n" +
            "       s.description,\n" +
            "       s.price,\n" +
            "       s.stripe_price,\n" +
            "       s.reduction,\n" +
            "       s.image,\n" +
            "       SUM(cs.cart_quantity * (s.price - ((s.price * s.reduction) / 100))) as total\n" +
            "from carts\n" +
            "         RIGHT JOIN carts_service cs on carts.cart_id = cs.cart_id\n" +
            "         LEFT JOIN services s on cs.service_id = s.service_id\n" +
            "WHERE status = 0\n" +
            "  AND customer_id = ?\n" +
            "  AND carts.cart_id = ?\n" +
            "GROUP BY carts.cart_id, carts.customer_id, carts.status, 'services', cs.cart_service_id, cs.cart_quantity, s.service_id, s.name, s.description, s.price, s.stripe_price, s.reduction, s.image\n" +
            "UNION\n" +
            "\n" +
            "select carts.cart_id,\n" +
            "       carts.customer_id,\n" +
            "       carts.status,\n" +
            "       carts.created_at,\n" +
            "       carts.updated_at,\n" +
            "       'goods'         as cart_name,\n" +
            "       cg.cart_good_id as cart_product_id,\n" +
            "       'goods'                         as cart_name,\n" +
            "       cg.cart_good_id                 as cart_product_id,\n" +
            "       cg.cart_quantity,\n" +
            "       g.good_id                       as product_id,\n" +
            "       g.name,\n" +
            "       g.description,\n" +
            "       g.price,\n" +
            "       g.stripe_price,\n" +
            "       g.reduction,\n" +
            "       g.image,\n" +
            "       SUM(cg.cart_quantity * (g.price - ((g.price * g.reduction) / 100))) as total\n" +
            "from carts\n" +
            "         RIGHT JOIN carts_good cg on carts.cart_id = cg.cart_id\n" +
            "         LEFT JOIN goods g on cg.good_id = g.good_id\n" +
            "WHERE status = 0\n" +
            "  AND customer_id = ?\n" +
            "  AND carts.cart_id = ?\n" +
            "GROUP BY carts.cart_id, carts.customer_id, carts.status, 'goods', cg.cart_good_id, cg.cart_quantity, g.good_id, g.name, g.description, g.price, g.stripe_price, g.reduction, g.image", [customer_id, customer_id], (err, results) => {
            if (err) {
                result({error: true, reason: err});
            } else {
                result({valid: true, result: results});
            }
        });
    }

// Get Goods by warehouse
export const getGoodsByWarehouseId = (id, result) => {
    db.query("SELECT * FROM goods inner join warehouses_stocks cg on goods.good_id = cg.good_id WHERE warehouse_id = ?;\n", [id], (err, results) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: results});
        }
    });
}

// Get Goods or Services by category
export const getGoodsOrServicesByCategoryId = (id, result) => {
    db.query("SELECT type FROM categories WHERE category_id = ?;\n", [id], (err, resultsType) => {
        if (err) {
            result({error: true, reason: err});
        } else if (resultsType[0].type === "biens") {
            db.query("SELECT * FROM goods inner join categories_goods cg on goods.good_id = cg.good_id WHERE category_id = ?;\n", [id], (err, results) => {
                if (err) {
                    result({error: true, reason: err});
                } else {
                    result({valid: true, result: results});
                }
            });
        } else if (resultsType[0].type === "services") {
            db.query("SELECT * FROM services inner join categories_services cg on services.service_id = cg.service_id WHERE category_id = ?;\n", [id], (err, results) => {
                if (err) {
                    result({error: true, reason: err});
                } else {
                    result({valid: true, result: results});
                }
            });
        }
    })
}


// Insert Goods to Database
export const insertGoods = (data, result) => {
    if (data.price <= 0) {
        result({valid: false, result: "Price cant be negative"});
    }

    const image = getValueImage(data.file);
    const category_id = data.categories;

    if (image.ext !== ('jpeg' && 'png' && 'jpg')) {
        result({valid: false, result: "Extension incompatible"});
    } else {
        db.query("INSERT INTO goods(name, description, price, seller_id) value(?, ?, ?, ?)", [data.nameGood, data.description, data.price, data.sellers], (err, resultsInsert) => {
            if (err) {
                result({error: true, reason: err});
            } else {
                const good_id = resultsInsert.insertId;
                const image_name = "img-" + data.seller_id + "-" + good_id + "." + image.ext;
                const path = "../src/assets/images/product/" + image_name;
                db.query("UPDATE goods SET image = ? WHERE good_id = ?", [image_name, good_id], (err) => {
                    if (err) {
                        result({error: true, reason: err});
                    } else {
                        db.query("INSERT INTO categories_goods(category_id, good_id) VALUE(?, ?)", [category_id, good_id], (err) => {
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

// Update Goods to Database
export const updateGoodsById = (data, id, result) => {
    if(data.price <= 0 || data.stock <= 0) {
        result({valid: false, result: "price or stock cant be negative"})
    } else {
        db.query("UPDATE goods SET name = ?, description = ?, price = ?, reduction = ? WHERE good_id = ?", [data.nameGood, data.description, data.price, data.reduction, id], (err) => {
            if (err) {
                result({error: true, reason: err});
            } else {
                db.query("select * from warehouses_stocks where good_id = ?", [id], (err, resultsWarehousesStocks) => {
                    if (err) {
                        result({error: true, reason: err});
                    } else if(resultsWarehousesStocks[0] !== undefined) {
                        db.query("UPDATE warehouses_stocks SET stock = ? WHERE good_id = ? AND warehouse_stock_id = ?", [data.stock, id, resultsWarehousesStocks[0].warehouse_stock_id], (err, results) => {
                            if (err) {
                                result({error: true, reason: err});
                            } else {
                                result({valid: true, result: results});
                            }
                        });
                    } else {
                        db.query("select * from warehouses limit 1", [data.stock, id], (err, resultsWarehouses) => {
                            if (err) {
                                result({error: true, reason: err});
                            } else {
                                db.query("INSERT INTO warehouses_stocks(warehouse_id, good_id, stock) value(?, ?, ?)", [resultsWarehouses[0].warehouse_id, id, data.stock], (err, results) => {
                                    if (err) {
                                        result({error: true, reason: err});
                                    } else {
                                        result({valid: true, result: results});
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
}

export const updateOnlineGoods = (id, result) => {
    db.query("update goods set online = !online where good_id = ?", [id], (err, result1) => {
        if (err) {
            result({error: true, reason: err});
        } else {
            result({valid: true, result: result1});
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