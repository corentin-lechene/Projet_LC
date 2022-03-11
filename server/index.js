// import express
import express from "express";
// import cors
import cors from "cors";

import "dotenv/config";



// import routes
import GoodsRoutes from "./routes/goodsRoutes.js";
import UsersRouter from "./routes/usersRoutes.js";
import StaffsRouter from "./routes/staffsRoutes.js";
import CompaniesRouter from "./routes/companiesRoutes.js";
import CustomersRouter from "./routes/customersRoutes.js";
import SellersRouter from "./routes/sellersRoutes.js";
import ServicesRoutes from "./routes/servicesRoutes.js";

// init express
const app = express();

// use express json
app.use(express.json());

// use cors
app.use(cors());



// use router
app.use(GoodsRoutes);   //Goods
app.use(ServicesRoutes);   //Services
app.use(StaffsRouter);  //Staffs
app.use(UsersRouter);   //Users
app.use(SellersRouter); //Sellers
app.use(CustomersRouter);   //Customers
app.use(CompaniesRouter);   //Companies


app.listen(9000, () => console.log('Server running at http://localhost:9000'));