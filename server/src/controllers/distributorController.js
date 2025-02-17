import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import sendMail from "../utils/sendMail.js";
import User from "../models/userModel.js";
import Distributor from "../models/distributorModel.js";
class DistributorController {
  static addDistributor = asyncHandler(async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const {
        name,
        email,
        password,
        address,
        phone,
        avatar,
        warehousedetails,
        areaCovered,
        zipCode,
        vat,
      } = req.body;
      console.log(req.body);

      if (
        !name ||
        !email ||
        !password ||
        !phone ||
        !address ||
        !zipCode ||
        !warehousedetails ||
        !vat
      ) {
        return next(
          new ErrorHandler("Please fill in all required fields.", 400)
        );
      }

      // Check if the distributor already exists
      const existsDistributor = await User.findOne({ email }).session(session);
      if (existsDistributor) {
        await session.abortTransaction();
        session.endSession();
        return next(
          new ErrorHandler("Dentist with this email already exists.", 400)
        );
      }

      // Upload the image to Cloudinary
      let uploadedImage = {

      }
      if(avatar){
        const result = await cloudinary.v2.uploader.upload(avatar, {
          folder: "avatars", // Optional: Save images in a specific folder
          resource_type: "auto", // Automatically detect the file type
        });
        uploadedImage = {
          public_id: result.public_id,
          url: result.secure_url,
        };
      }else{
        uploadedImage = {
          public_id: "sample",
          url: "https://cdn.pixabay.com/photo/2024/08/22/10/37/ai-generated-8988977_1280.jpg"
        }
      }

      // Create the User entry
      const distributorUser = await User.create(
        [
          {
            name,
            email,
            password,
            phone,
            address,
            isVerified: true,
            role: "distributor",
            avatar: uploadedImage,
          },
        ],
        { session }
      );

      // Create the Distributor profile
      const newDistributor = await Distributor.create(
        [
          {
            user: distributorUser[0]._id,
            areaCovered,
            zipCode,
            warehousedetails,
          },
        ],
        { session }
      );

      await session.commitTransaction();
      session.endSession();


      // TODO: SEND MAIL TO THE EMAIL OF THE ADDED DISTRIBUTOR 

      res.status(201).json({
        success: true,
        message: "Distributor Added successfully.",
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      return next(new ErrorHandler(error.message, 500));
    }
  });

  static updateDistributor = asyncHandler(async (req, res, next) => {
    try {
    } catch (error) {
      return next(new ErrorHandler(err.message, 500));
    }
  });
  static deleteDistributor = asyncHandler(async (req, res, next) => {
    try {
    } catch (error) {
      return next(new ErrorHandler(err.message, 500));
    }
  });
}
export default DistributorController;
