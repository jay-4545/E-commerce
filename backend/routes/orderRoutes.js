const express = require("express");
const { authenticateUser } = require("../middlewares/authentication");
const createOrder = require("../controllers/ordersController");
const orderRouter = express.Router();

orderRouter.post("/", authenticateUser, createOrder);

module.exports = orderRouter;
