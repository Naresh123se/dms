import express from "express";
import ProductController from "../controllers/productController.js";
import { isAuthenticated, authorizeRoles } from "../middlewares/auth.js";

const productRouter = express.Router();

productRouter.post(
  "/create-product",
  isAuthenticated,
  authorizeRoles("admin"),
  ProductController.createProduct
);
productRouter.post(
  "/activate",
  isAuthenticated,
  authorizeRoles("admin"),
  ProductController.updateProductDetails
);
productRouter.post(
  "/login",
  isAuthenticated,
  authorizeRoles("admin"),
  ProductController.updateProductStock
);
productRouter.post(
  "/logout",
  isAuthenticated,
  authorizeRoles("admin"),
  ProductController.logoutUser
);

export default productRouter;
