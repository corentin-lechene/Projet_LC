// import express
import express from "express";

// init express companiesRouter
const companiesRouter = express.Router();

// import function from controller
import { showCompanies, showCompaniesById /* TODO , createCompanies, updateCompanies, deleteCompanies */ } from "../controllers/companies.js";


companiesRouter.get('/companies', showCompanies);
companiesRouter.get('/companies/:id', showCompaniesById);
//TODO companiesRouter.post('/companies', createCompanies);
//TODO companiesRouter.put('/companies/:id', updateCompanies);
//TODO companiesRouter.delete('/companies/:id', deleteCompanies);

export default companiesRouter;
