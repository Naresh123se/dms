import express from "express";
import OrderController from "../controllers/orderController.js";
import { isAuthenticated, authorizeRoles } from "../middlewares/auth.js";

const orderRouter = express.Router();

orderRouter.post("/", isAuthenticated, OrderController.createOrder);
orderRouter.get(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  OrderController.fetchAllOrders
);

orderRouter.get(
  "/get-orders/distributor",
  isAuthenticated,
  authorizeRoles("Distributor"),
  OrderController.getDistributorsOrders
);

orderRouter.get("/get-orders/shop", isAuthenticated, authorizeRoles("shop") , OrderController.getShopOrders)

export default orderRouter;
