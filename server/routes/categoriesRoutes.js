// import express
import express from "express";

// init express categoriesRouter
const categoriesRouter = express.Router();

// import function from controller
import {
    showCategories,
    showCategoriesById,
    createCategories,
    deleteCategories,
    updateCategories
} from "../controllers/categories.js";


categoriesRouter.get('/categories', showCategories);
categoriesRouter.get('/categories/:id', showCategoriesById);
categoriesRouter.post('/categories', createCategories);
categoriesRouter.put('/categories/:id', updateCategories);
categoriesRouter.delete('/categories/:id', deleteCategories);

export default categoriesRouter;
