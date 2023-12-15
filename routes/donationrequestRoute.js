import { Router } from "express";
import {
  getDonationrequest,
  getDonationrequestProfile,
  updateDonationrequestProfile,
} from "../controllers/Donationrequest.js";

const donationrequestRoutes = Router();

donationrequestRoutes.get("/", getDonationrequest);
donationrequestRoutes.get("/:id", getDonationrequestProfile);
donationrequestRoutes.put("/:id", updateDonationrequestProfile);

export default donationrequestRoutes;
