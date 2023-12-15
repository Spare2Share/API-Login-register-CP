import { Router } from "express";
import {
  postDonation,
} from "../controllers/Donation.js";

const donationRoutes = Router();

donationRoutes.post("/", postDonation);

export default donationRoutes;
