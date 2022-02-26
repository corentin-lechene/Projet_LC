// import express
import express from "express";

// init express router
const router = express.Router();

// import function from controller
import {showGoods, showGoodsById, createGoods, updateGoods, deleteGoods} from "../controllers/goods.js";
import {showUsers, showUsersById} from "../controllers/users.js";


// Goods
router.get('/goods', showGoods);
router.get('/goods/:id', showGoodsById);
router.post('/goods', createGoods);
router.put('/goods/:id', updateGoods);
router.delete('/goods/:id', deleteGoods);

router.get('/users', showUsers);
router.get('/users/:id', showUsersById);

export default router;