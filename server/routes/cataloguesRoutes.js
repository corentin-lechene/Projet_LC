// import express
import express from "express";

// init express cataloguesRouter
const cataloguesRouter = express.Router();

// import function from controller
import { showCatalogues, showCataloguesById, createCatalogues, deleteCatalogues /* TODO updateCatalogues */ } from "../controllers/catalogues.js";


cataloguesRouter.get('/catalogues', showCatalogues);
cataloguesRouter.get('/catalogues/:id', showCataloguesById);
cataloguesRouter.post('/catalogues', createCatalogues);
//TODO cataloguesRouter.put('/catalogues/:id', updateCatalogues);
cataloguesRouter.delete('/catalogues/:id', deleteCatalogues);

export default cataloguesRouter;
