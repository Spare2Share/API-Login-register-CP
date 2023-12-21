import { Router } from "express";
import {
  getOrganization,
  getOrganizationProfile,
  updateOrganizationProfile,
} from "../controllers/Organization.js";
import { verifyToken } from "../middleware/Verifytoken.js";

const organizationRoutes = Router();

organizationRoutes.get("/", verifyToken, getOrganization);
organizationRoutes.get("/:id", verifyToken, getOrganizationProfile);
organizationRoutes.put("/:id", verifyToken, updateOrganizationProfile);

export default organizationRoutes;
