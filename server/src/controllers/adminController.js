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
    console.log(req.body)
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
      user.requestDistributor = "allocated";
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Distributor allocated successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });
  static fetchDistributorAllocationRequest = asyncHandler(
    async (req, res, next) => {
      try {
        
        const users = await User.find({requestDistributor:"process"})
        if(!users){
          return res.status(200).json({
            success:true,
            message: "No allocation request found"
          })
        }
        return res.status(200).json({
          success: true,
          message: "Distributor allocation request fetched successfully",
          users
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    }
  );
}

export default AdminController;
