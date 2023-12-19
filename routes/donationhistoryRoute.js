import { Router } from "express";
import {
  addDonationHistory,
  getDonationHistories,
  getDonationHistoryByUserId,
} from "../controllers/Donationhistory.js";
import { verifyToken } from "../middleware/Verifytoken.js";

const donationHistoryRoutes = Router();

donationHistoryRoutes.get("/", verifyToken, getDonationHistories);
donationHistoryRoutes.post("/", verifyToken, addDonationHistory);
donationHistoryRoutes.get("/:id", verifyToken, getDonationHistoryByUserId);

export default donationHistoryRoutes;
