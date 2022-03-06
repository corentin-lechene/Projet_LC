// import express
import express from "express";

// init express staffsRouter
const staffsRouter = express.Router();

// import function from controller
import {showStaffs, showStaffsById, deleteStaffs, createStaffs, updateStaffs} from "../controllers/staffs.js";


staffsRouter.get('/staffs', showStaffs);
staffsRouter.get('/staffs/:id', showStaffsById);
staffsRouter.post('/staffs', createStaffs);
staffsRouter.put('/staffs/:id', updateStaffs);
staffsRouter.delete('/staffs/:id', deleteStaffs);

export default staffsRouter;