import { Router } from "express";
import {
  addRecipientHistory,
  getRecipientHistories,
  getRecipientHistoryByOrganizationId,
  getRecipientHistoryByUserId,
} from "../controllers/Recipienthistory.js";
import { verifyToken } from "../middleware/Verifytoken.js";

const recipientHistoryRoutes = Router();

recipientHistoryRoutes.get("/", verifyToken, getRecipientHistories);
recipientHistoryRoutes.get(
  "/:id_user",
  verifyToken,
  getRecipientHistoryByUserId
);
recipientHistoryRoutes.get(
  "/:id_organization",
  verifyToken,
  getRecipientHistoryByOrganizationId
);
recipientHistoryRoutes.post("/", verifyToken, addRecipientHistory);

export default recipientHistoryRoutes;
