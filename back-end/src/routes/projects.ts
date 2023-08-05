import { Router } from "express";
import ProjectController from "../controllers/projectController.js";
import { authorization, authorAdmin } from "../middleware/authorization.js";

const router = Router();

router.get("/", ProjectController.getProjects);
router.post("/", ProjectController.createProject);
router.use("/:id", authorization);
router.get("/:id", ProjectController.getProjectById);
router.put("/:id", ProjectController.updateProject);
router.delete("/:id", authorAdmin, ProjectController.deleteProject);
router.patch(
  "/:id/progress",
  authorAdmin,
  ProjectController.patchProgressProject
);
router.patch("/:id/status", ProjectController.patchStatusProject);

export default router;
