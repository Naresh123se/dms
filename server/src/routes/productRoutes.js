import express from "express";
import ProductController from "../controllers/productController.js";
import { isAuthenticated, authorizeRoles } from "../middlewares/auth.js";

const productRouter = express.Router();

productRouter.post(
  "/",
  isAuthenticated,
  authorizeRoles("distributor"),
  ProductController.createProduct
);
productRouter.get(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  ProductController.fetchAllProducts
);

productRouter.get(
  "/distributor-products",
  isAuthenticated,
  authorizeRoles("shop", "distributor"),
  ProductController.fetchDistributorProduct
);

productRouter.get(
  "/:id",
  isAuthenticated,
  authorizeRoles("distributor"),
  ProductController.fetchSingleProduct
);
productRouter.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("distributor"),
  ProductController.updateProductDetails
);
productRouter.patch(
  "/:id",
  isAuthenticated,
  authorizeRoles("distributor"),
  ProductController.updateProductStock
);

export default productRouter;
