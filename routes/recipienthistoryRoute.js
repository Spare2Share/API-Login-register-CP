import { Router } from "express";
import {
  addRecipientHistory,
  getRecipientHistories,
} from "../controllers/Recipienthistory.js";
import { verifyToken } from "../middleware/Verifytoken.js";

const recipientHistoryRoutes = Router();

recipientHistoryRoutes.get("/", verifyToken, getRecipientHistories);
recipientHistoryRoutes.post("/", verifyToken, addRecipientHistory);

export default recipientHistoryRoutes;
