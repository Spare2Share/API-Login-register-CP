import express from "express";
import { getDonationrequest } from "../controllers/Donationrequest.js";
import { getDonorhistory } from "../controllers/Donorhistory.js";
import { getFooddonation } from "../controllers/Fooddonation.js";
import { getOrganization } from "../controllers/Organization.js";
import { getRecipienthistory } from "../controllers/Recipienthistory.js";
import userRoutes from "./userRoute.js";

const router = express.Router();

router.use("/user", userRoutes);

router.get("/donationrequest", getDonationrequest);
router.get("/donorhistory", getDonorhistory);
router.get("/fooddonation", getFooddonation);
router.get("/organization", getOrganization);
router.get("/recipienthistory", getRecipienthistory);

export default router;
