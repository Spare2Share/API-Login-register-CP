import { Router } from "express";
import {
  postRecipienthistory,
} from "../controllers/Recipienthistory.js";

const recipienthistoryRoutes = Router();

recipienthistoryRoutes.post("/", postRecipienthistory);

export default recipienthistoryRoutes;
