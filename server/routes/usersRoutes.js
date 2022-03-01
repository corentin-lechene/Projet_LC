// import express
import express from "express";

// init express usersRouter
const usersRouter = express.Router();

// import function from controller
import { showUsers, showUsersById, loginUsers, tokenUsers /* TODO , createUsers, updateUsers, deleteUsers */ } from "../controllers/users.js";


usersRouter.get('/users', showUsers);
usersRouter.get('/users/:id', showUsersById);

usersRouter.get('/token/:token', tokenUsers);
usersRouter.post('/login', loginUsers);
//TODO usersRouter.post('/users', createUsers);
//TODO usersRouter.put('/users/:id', updateUsers);
//TODO usersRouter.delete('/users/:id', deleteUsers);

export default usersRouter;
