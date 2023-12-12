import { Router } from "express";
import {
  getOrganization,
  getOrganizationProfile,
  updateOrganizationProfile,
} from "../controllers/Organization.js";

const organizationRoutes = Router();

organizationRoutes.get("/", getOrganization);
organizationRoutes.get("/:id", getOrganizationProfile);
organizationRoutes.put("/:id", updateOrganizationProfile);

export default organizationRoutes;
