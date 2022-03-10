// import express
import express from "express";

// init express goodsRouter
const servicesRouter = express.Router();

// import function from controller
import {deleteServices, showServices, showServicesById, updateServices, createServices, showServicesBySellerId} from "../controllers/services.js";



servicesRouter.get('/services', showServices);
servicesRouter.get('/services-sellers/:id', showServicesBySellerId);
servicesRouter.get('/services/:id', showServicesById);
servicesRouter.post('/services', createServices);
servicesRouter.put('/services/:id', updateServices);
servicesRouter.delete('/services/:id', deleteServices);

export default servicesRouter;