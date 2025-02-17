import { asyncHandler } from "../middlewares/asyncHandler.js";

class ProductController {
  static createProduct = asyncHandler(async (req, res, next) => {
    try {
    } catch (error) {
      return next(new ErrorHandler(err.message, 500));
    }
  });

  static updateProductDetails = asyncHandler(async (req, res, next) => {
    try {
    } catch (error) {
      return next(new ErrorHandler(err.message, 500));
    }
  });

  static updateProductStock = asyncHandler(async (req, res, next) => {
    try {
    } catch (error) {
      return next(new ErrorHandler(err.message, 500));
    }
  });
  static deleteProduct = asyncHandler(async (req, res, next) => {
    try {
    } catch (error) {
      return next(new ErrorHandler(err.message, 500));
    }
  });
}
export default ProductController;
