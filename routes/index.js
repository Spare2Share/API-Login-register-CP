import express from "express";
import userRoutes from "./userRoute.js";
import authRoutes from "./authRoute.js";
import organizationRoutes from "./organizationRoute.js";
import donationRequestRoutes from "./donationrequestRoute.js";
import donationRoutes from "./donationRoute.js";
import donationHistoryRoutes from "./donationhistoryRoute.js";
import recipientHistoryRoutes from "./recipienthistoryRoute.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/organization", organizationRoutes);
router.use("/donation-request", donationRequestRoutes);
router.use("/donation", donationRoutes);
router.use("/donation-history", donationHistoryRoutes);
router.use("/recipient-history", recipientHistoryRoutes);

export default router;
