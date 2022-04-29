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
import WarehousesRoutes from "./routes/warehousesRoutes.js";
import CategoriesRoutes from "./routes/categoriesRoutes.js";
import CataloguesRoutes from "./routes/cataloguesRoutes.js";
import Categories_goodsRoutes from "./routes/categories_goodsRoutes.js";
import Categories_servicesRoutes from "./routes/categories_servicesRoutes.js";
import Carts_goodsRoutes from "./routes/carts_goodsRoutes.js";
import Carts_servicesRoutes from "./routes/carts_servicesRoutes.js";
import CartsRoutes from "./routes/cartsRoutes.js";
import CardsRoutes from "./routes/cardsRoutes.js";
import Warehouses_stocksRoutes from "./routes/warehouses_stocksRoutes.js";

// init express
const app = express();

// use express json
app.use(express.json());

// use cors
app.use(cors());


// use router
app.use(CategoriesRoutes);          // Categories
app.use(WarehousesRoutes);          // Warehouse
app.use(CataloguesRoutes);          // Catalogues
app.use(GoodsRoutes);               // Goods
app.use(ServicesRoutes);            // Services
app.use(StaffsRouter);              // Staffs
app.use(UsersRouter);               // Users
app.use(SellersRouter);             // Sellers
app.use(CustomersRouter);           // Customers
app.use(CompaniesRouter);           // Companies
app.use(Categories_goodsRoutes);    // categories_goods
app.use(Categories_servicesRoutes); // categories_services
app.use(Carts_goodsRoutes);         // carts_goods
app.use(Carts_servicesRoutes);      // carts_services
app.use(CartsRoutes);               // carts
app.use(CardsRoutes);               // cards
app.use(Warehouses_stocksRoutes);   // warehouses_stocks


app.listen(9000, () => console.log('Server running at http://localhost:9000'));