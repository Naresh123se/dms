import express from "express";
import DistributorController from "../controllers/distributorController.js";
import { isAuthenticated, authorizeRoles } from "../middlewares/auth.js";

const adminRouter = express.Router();


// ************************* AUTHENTICATION ROUTES **********************

adminRouter.post("/register-distributor", AdminController.Registration);


export default adminRouter;
