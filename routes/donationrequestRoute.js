import { Router } from "express";
import {
  addDonationRequest,
  getDonationRequest,
  getDonationRequestById,
  updateDonationrequest,
} from "../controllers/Donationrequest.js";
import { verifyToken } from "../middleware/Verifytoken.js";

const donationRequestRoutes = Router();

donationRequestRoutes.get("/", verifyToken, getDonationRequest);
donationRequestRoutes.post("/", verifyToken, addDonationRequest);
donationRequestRoutes.get("/:id", verifyToken, getDonationRequestById);
donationRequestRoutes.put("/:id", verifyToken, updateDonationrequest);

export default donationRequestRoutes;
