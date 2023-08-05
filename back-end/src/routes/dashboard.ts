import { Router } from "express";
import DashboardController from "../controllers/dashboardController.js";

const route = Router();

route.get("/", DashboardController.getFullYearProgress);

export default route;
