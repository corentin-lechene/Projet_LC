// import express
import express from "express";

// init express staffsRouter
const staffsRouter = express.Router();

// import function from controller
import {showStaffs, showStaffsById, deleteStaffs, createStaffs} from "../controllers/staffs.js";


staffsRouter.get('/staffs', showStaffs);
staffsRouter.get('/staffs/:id', showStaffsById);

staffsRouter.post('/staffs/:id', createStaffs);
staffsRouter.delete('/staffs/:id', deleteStaffs);

export default staffsRouter;