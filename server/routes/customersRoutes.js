// import express
import express from "express";

// init express customersRouter
const customersRouter = express.Router();

// import function from controller
import { showCustomers, showCustomersById, createCustomers, updateCustomers, deleteCustomers, showCustomersByCompanyId } from "../controllers/customers.js";


customersRouter.get('/customers-companies/:id', showCustomersByCompanyId);
customersRouter.get('/customers', showCustomers);
customersRouter.get('/customers/:id', showCustomersById);
customersRouter.post('/customers', createCustomers);
customersRouter.put('/customers/:id', updateCustomers);
customersRouter.delete('/customers/:id', deleteCustomers);

export default customersRouter;
