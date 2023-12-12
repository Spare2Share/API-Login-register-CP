import { Router } from "express";
import {
  changePassword,
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/Auth.js";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/token", refreshToken);
authRoutes.put("/change-password", changePassword);
authRoutes.delete("/logout", logout);

export default authRoutes;
