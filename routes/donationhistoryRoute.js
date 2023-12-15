import { Router } from "express";
import {
  postDonationhistory,
} from "../controllers/Donationhistory";

const donationhistoryRoutes = Router();

donationhistoryRoutes.post("/", postDonationhistory);

export default donationhistoryRoutes;