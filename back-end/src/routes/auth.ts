import { Router } from "express";
import UserController from "../controllers/userController.js";
import { authentication } from "../middleware/authentication.js";
import { userAuthor } from "../middleware/authorization.js";

const auth = Router();

auth.post("/login", UserController.login);
auth.post("/register", UserController.register);
auth.use(authentication);
auth.delete("/logout", UserController.logout);
auth.patch("/change-password/:id", userAuthor, UserController.changePassword);

export default auth;
