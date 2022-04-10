// import express
import express from "express";

// init express categories_servicesRouter
const categories_servicesRouter = express.Router();

// import function from controller
import { showCategories_services, showCategories_servicesById, createCategories_services, deleteCategories_services /* TODO updateCategories_services */ } from "../controllers/categories_services.js";


categories_servicesRouter.get('/categories_services', showCategories_services);
categories_servicesRouter.get('/categories_services/:id', showCategories_servicesById);
categories_servicesRouter.post('/categories_services', createCategories_services);
//TODO categories_servicesRouter.put('/categories_services/:id', updateCategories_services);
categories_servicesRouter.delete('/categories_services/:id', deleteCategories_services);

export default categories_servicesRouter;
