// import express
import express from "express";

// init express customersRouter
const customersRouter = express.Router();

// import function from controller
import { showCustomers, showCustomersById, deleteCustomers, createCustomers /* TODO  updateCustomers */ } from "../controllers/customers.js";


customersRouter.get('/customers', showCustomers);
customersRouter.get('/customers/:id', showCustomersById);
customersRouter.post('/customers', createCustomers);
//TODO customersRouter.put('/customers/:id', updateCustomers);
customersRouter.delete('/customers/:id', deleteCustomers);

export default customersRouter;
