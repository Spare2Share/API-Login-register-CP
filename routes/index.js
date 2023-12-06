import express from "express";
import { getUser, Login, refreshToken, Register, Logout } from "../controllers/User.js";
import { verifyToken } from "../middleware/Verifytoken.js";
import { getDonationrequest } from "../controllers/Donationrequest.js";
import { getDonorhistory } from "../controllers/Donorhistory.js";
import { getFooddonation } from "../controllers/Fooddonation.js";
import { getOrganization } from "../controllers/Organization.js";
import { getRecipienthistory } from "../controllers/Recipienthistory.js";

const router = express.Router();

router.get('/user', verifyToken, getUser);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.post('/user/register', Register);
router.post('/user/login', Login);  
router.get('/donationrequest', getDonationrequest);
router.get('/donorhistory', getDonorhistory);
router.get('/fooddonation', getFooddonation);
router.get('/organization', getOrganization);
router.get('/recipienthistory', getRecipienthistory);

export default router;