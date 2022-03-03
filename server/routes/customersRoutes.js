// import express
import express from "express";

// init express customersRouter
const customersRouter = express.Router();

// import function from controller
import { showCustomers, showCustomersById /* TODO , createCustomers, updateCustomers, deleteCustomers */ } from "../controllers/customers.js";


customersRouter.get('/customers', showCustomers);
customersRouter.get('/customers/:id', showCustomersById);
//TODO customersRouter.post('/customers', createCustomers);
//TODO customersRouter.put('/customers/:id', updateCustomers);
//TODO customersRouter.delete('/customers/:id', deleteCustomers);

export default customersRouter;
