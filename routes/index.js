import express from "express";
import { getDonationrequest } from "../controllers/Donationrequest.js";
import { getDonorhistory } from "../controllers/Donorhistory.js";
import { getFooddonation } from "../controllers/Fooddonation.js";
import { getRecipienthistory } from "../controllers/Recipienthistory.js";
import userRoutes from "./userRoute.js";
import authRoutes from "./authRoute.js";
import organizationRoutes from "./organizationRoute.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/organization", organizationRoutes);

router.get("/donationrequest", getDonationrequest);
router.get("/donorhistory", getDonorhistory);
router.get("/fooddonation", getFooddonation);
router.get("/recipienthistory", getRecipienthistory);

export default router;
