// Import function from Goods Model
import {
    getGoods,
    getGoodsById,
    insertGoods,
    updateGoodsById,
    deleteGoodsById,
    getGoodsOrServicesByCategoryId,
    getGoodsByWarehouseId,
    getGoodsOrServicesByCartId,
    getGoodsOrServicesBySellerId
    getGoodsOrServicesByCartId,
    updateOnlineGoods,
    getGoodsOnline
} from "../models/goodsModel.js";

// Get All Goods
export const showGoods = (req, res) => {
    getGoods((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

export const showGoodsOnline = (req, res) => {
    getGoodsOnline((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Get Single Goods
export const showGoodsById = (req, res) => {
    getGoodsById(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Get Goods by seller
export const showGoodsOrServicesBySellerId = (req, res) => {
    getGoodsOrServicesBySellerId(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
// Get Goods or Services by category
export const showGoodsOrServicesByCategoryId = (req, res) => {
    getGoodsOrServicesByCategoryId(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Get Goods or Services by cart id
export const showGoodsOrServicesByCartId = (req, res) => {
    getGoodsOrServicesByCartId(req.params.id, req.params.cart_id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Get Goods by warehouse id
export const showGoodsByWarehouseId = (req, res) => {
    getGoodsByWarehouseId(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Create New Goods
export const createGoods = (req, res) => {
    const data = req.body;
    insertGoods(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Update Goods
export const updateGoods = (req, res) => {
    const data  = req.body;
    const id    = req.params.id;
    updateGoodsById(data, id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Set online Goods
export const onlineGoods = (req, res) => {
    const id = req.params.id;
    updateOnlineGoods(id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Delete Goods
export const deleteGoods = (req, res) => {
    const id = req.params.id;
    deleteGoodsById(id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
