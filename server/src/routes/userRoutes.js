import express from "express";
import AuthController from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const authRouter = express.Router();

// ************************* AUTHENTICATION ROUTES **********************
authRouter.put(
  "/change-password",
  isAuthenticated,
  AuthController.changePassword
);

authRouter.post("/register", AuthController.registration);
authRouter.post("/activate", AuthController.activation);
authRouter.post("/login", AuthController.login);
authRouter.post("/logout", isAuthenticated, AuthController.logout);

// ********************* PROFILE MANAGEMENT ROUTES *********************
authRouter.put(
  "/update-profile",
  isAuthenticated,
  AuthController.updateProfile
);
authRouter.get("/get-profile", isAuthenticated, AuthController.getProfile);

export default authRouter;
