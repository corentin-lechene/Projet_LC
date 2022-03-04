// import express
import express from "express";

// init express companiesRouter
const companiesRouter = express.Router();

// import function from controller
import { showCompanies, showCompaniesById, deleteCompanies, createCompanies /* TODO updateCompanies */ } from "../controllers/companies.js";


companiesRouter.get('/companies', showCompanies);
companiesRouter.get('/companies/:id', showCompaniesById);
companiesRouter.post('/companies', createCompanies);
//TODO companiesRouter.put('/companies/:id', updateCompanies);
companiesRouter.delete('/companies/:id', deleteCompanies);

export default companiesRouter;
