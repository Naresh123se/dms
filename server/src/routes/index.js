import express from "express";
import userRouter from "./userRoutes.js";
import distributorRouter from "./distributorRoutes.js";

const router = express.Router();

router.use("/api/v1/user", userRouter);
router.use("/api/v1/distributor", distributorRouter);

export default router;
