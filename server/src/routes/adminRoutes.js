import express from "express";
import AdminController from "../controllers/adminController.js";
import { isAuthenticated, authorizeRoles } from "../middlewares/auth.js";

const adminRouter = express.Router();


// ************************* AUTHENTICATION ROUTES **********************

adminRouter.put("/allocate-distributor", isAuthenticated, authorizeRoles('admin'), AdminController.allocateDistributor);
adminRouter.get("/allocation-request", isAuthenticated, authorizeRoles('admin'), AdminController.fetchDistributorAllocationRequest)

export default adminRouter;
