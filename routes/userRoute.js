import { Router } from "express";
import { verifyToken } from "../middleware/Verifytoken.js";
import {
  getUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/User.js";

const userRoutes = Router();

userRoutes.get("/", verifyToken, getUser);
userRoutes.get("/:id", verifyToken, getUserProfile);
userRoutes.put("/:id", verifyToken, updateUserProfile);

export default userRoutes;
