import { asyncHandler } from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/ErrorHandler.js";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import sendMail from "../utils/sendMail.js";
import createActivationToken from "../utils/activation.js";
import { sendToken } from "../utils/jwt.js";
import Distributor from "../models/distributorModel.js";

class AdminController {
  static allocateDistributor = asyncHandler(async (req, res, next) => {
    try {
      const { userId, distributorId } = req.body;
      const user = await User.findById(userId);
      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }
      const distributor = await Distributor.findById(distributorId);
      if (!distributor) {
        return next(new ErrorHandler("Distributor not found", 400));
      }
      user.distributor = distributor._id;
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Distributor allocated successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });
}

export default AdminController;
