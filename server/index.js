// import express
import express from "express";
// import cors
import cors from "cors";

// import routes
import GoodsRoutes from "./routes/goodsRoutes.js";
import UsersRouter from "./routes/usersRoutes.js";
import StaffsRouter from "./routes/staffsRoutes.js";
import CompaniesRouter from "./routes/companiesRoutes.js";
import customersRouter from "./routes/customersRoutes.js";

// init express
const app = express();

// use express json
app.use(express.json());

// use cors
app.use(cors());

// use router
app.use(GoodsRoutes);   //Goods
app.use(StaffsRouter);  //Staffs
app.use(UsersRouter);   //Users
app.use(customersRouter);   //Customers
app.use(CompaniesRouter);   //Companies


app.listen(9000, () => console.log('Server running at http://localhost:9000'));