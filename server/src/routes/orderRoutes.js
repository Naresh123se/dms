import express from "express";
import OrderController from "../controllers/orderController.js";
import { isAuthenticated, authorizeRoles } from "../middlewares/auth.js";

const orderRouter = express.Router();

orderRouter.post("/", isAuthenticated, OrderController.createOrder);

// **************** GET ALL ORDERS FOR THE USERS ***********************

orderRouter.get(
  "/get-orders/distributor",
  isAuthenticated,
  authorizeRoles("Distributor"),
  OrderController.getDistributorsOrders
);

orderRouter.get(
  "/get-orders/shop",
  isAuthenticated,
  authorizeRoles("shop"),
  OrderController.getShopOrders
);

// ************ DISTRIBUTORS CONTROLS OVER THE ORDER *********************


orderRouter.put(
  "/accept-order/:id",
  isAuthenticated,
  authorizeRoles("distributor"),
  OrderController.acceptOrder
);

orderRouter.put(
  "/reject-order/:id",
  isAuthenticated,
  authorizeRoles("distributor"),
  OrderController.rejectOrder
);

orderRouter.put(
  "/delivered-order/:id",
  isAuthenticated,
  authorizeRoles("distributor"),
  OrderController.makeOrderAsDelivered
);




export default orderRouter;
