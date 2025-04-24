const express = require("express");
const {
  createOrderHandler,
  getAllOrderHandler,
  getOrderByIdHandler,
  deleteOrderHandler,
  notificationHandler,
} = require("../../controllers/orderController");
const { authCheck, checkIsAdmin } = require("../../middleware/auth");
const orderRouter = express.Router();

orderRouter.post("", authCheck, createOrderHandler);
orderRouter.get("", getAllOrderHandler);
orderRouter.get("/:id", getOrderByIdHandler);
orderRouter.delete(
  "/delete/:id",
  authCheck,
  getAllOrderHandler,
  deleteOrderHandler
);
orderRouter.post("/payment-notification", notificationHandler);

module.exports = { orderRouter };
