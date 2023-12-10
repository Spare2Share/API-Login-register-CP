import { Router } from "express";
import { verifyToken } from "../middleware/Verifytoken.js";
import {
  changeUserPassword,
  getUser,
  getUserProfile,
  login,
  logout,
  refreshToken,
  register,
  updateUserProfile,
} from "../controllers/User.js";

const userRoutes = Router();

userRoutes.get("/", verifyToken, getUser);
userRoutes.get("/:id", verifyToken, getUserProfile);
userRoutes.put("/:id", verifyToken, updateUserProfile);
userRoutes.get("/token", refreshToken);
userRoutes.post("/auth/register", register);
userRoutes.post("/auth/login", login);
userRoutes.put("/auth/change-password/:id", verifyToken, changeUserPassword);
userRoutes.delete("/auth/logout", verifyToken, logout);

export default userRoutes;
