const express = require("express");
const connectToDb = require("./db/connect");
const categoriesRouter = require("./routes/catgoriesRoutes");
require("dotenv").config();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const subCategoriesRouter = require("./routes/subCategoriesRoutes");
const productsRouter = require("./routes/productsRoutes");
const pageRouter = require("./routes/pageRoutes");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");
const filterRouter = require("./routes/filterRoutes");
const server = express();

server.use(cors());
server.use(express.json());
server.use(fileUpload());

server.use("/uploads", express.static("uploads"));

server.use("/categories", categoriesRouter);
server.use("/subCategories", subCategoriesRouter);
server.use("/products", productsRouter);
server.use("/pages", pageRouter);
server.use("/users", userRouter);
server.use("/orders", orderRouter);
server.use("/filters", filterRouter);

const start = async () => {
  try {
    await connectToDb();
    console.log("Connected to database");
    server.listen(process.env.PORT, () => {
      console.log(`server is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

start();
