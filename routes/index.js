import express from "express";
import { getDonationrequest } from "../controllers/Donationrequest.js";
import { postDonationhistory } from "../controllers/Donationhistory.js";
import { postDonation } from "../controllers/Donation.js";
import { postRecipienthistory } from "../controllers/Recipienthistory.js";
import userRoutes from "./userRoute.js";
import authRoutes from "./authRoute.js";
import organizationRoutes from "./organizationRoute.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/organization", organizationRoutes);

router.get("/donationrequest", getDonationrequest);
router.post("/donationhistory", postDonationhistory);
router.post("/donation", postDonation);
router.post("/recipienthistory", postRecipienthistory);

export default router;
