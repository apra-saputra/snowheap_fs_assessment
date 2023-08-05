import { Router } from "express";
import projectsRoute from "./projects.js";
import authRoute from "./auth.js";
import dashboardRoute from "./dashboard.js";
import { authentication, appkey } from "../middleware/authentication.js";

const router = Router();

router.use(appkey);
router.use("/auth", authRoute);
router.use(authentication);
router.use("/projects", projectsRoute);
router.use("/dashboard", dashboardRoute);

export default router;
