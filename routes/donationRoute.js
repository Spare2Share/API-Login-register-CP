import { Router } from "express";
import { addDonation, getDonations } from "../controllers/Donation.js";
import { verifyToken } from "../middleware/Verifytoken.js";

const donationRoutes = Router();

donationRoutes.get("/", verifyToken, getDonations);
donationRoutes.post("/", verifyToken, addDonation);

export default donationRoutes;
