// import express
import express from "express";

// init express usersRouter
const usersRouter = express.Router();

// import function from controller
import {
    showUsers,
    showUsersById,
    loginUsers,
    tokenUsers,
    createUsers,
    deleteUsers,
    showUsersForStaffs,
    showUsersByCompanyId,
    onlineUsers,
    sendForgotPassword
} from "../controllers/users.js";


usersRouter.get('/users-staffs', showUsersForStaffs);
usersRouter.get('/users', showUsers);
usersRouter.get('/users-company/:id', showUsersByCompanyId);
usersRouter.get('/users/:id', showUsersById);
usersRouter.get('/forgotpassword/:email', sendForgotPassword);

usersRouter.post('/token', tokenUsers);

usersRouter.post('/login', loginUsers);
usersRouter.post('/users', createUsers);
usersRouter.put('/customers-companies-online/:id', onlineUsers);
usersRouter.put('/users-online/:id', onlineUsers);

usersRouter.delete('/customers-companies/:id', deleteUsers);
usersRouter.delete('/users-staffs/:id', deleteUsers);
usersRouter.delete('/users/:id', deleteUsers);
export default usersRouter;
