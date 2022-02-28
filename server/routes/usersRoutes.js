// import express
import express from "express";

// init express usersRouter
const usersRouter = express.Router();

// import function from controller
import { showUsers, showUsersById, createUsers /* updateUsers, deleteUsers */ } from "../controllers/users.js";


usersRouter.get('/users', showUsers);
usersRouter.get('/users/:id', showUsersById);
usersRouter.post('/users', createUsers);
//TODO usersRouter.put('/users/:id', updateUsers);
//TODO usersRouter.delete('/users/:id', deleteUsers);

export default usersRouter;
