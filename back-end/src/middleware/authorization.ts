import { NextFunction, Request } from "express";
import Validator from "../helpers/validator.js";
import ProjectService from "../service/ProjectService.js";
import UserService from "../service/userService.js";

const { validateAuthor } = Validator;

export const authorization = async (req: Request, _, next: NextFunction) => {
  try {
    const { id: userId, role } = req.user;
    const { id } = req.params;

    validateAuthor(userId);
    validateAuthor(role);

    const project = await ProjectService.findById(Number(id));

    if (project.authorId !== userId) {
      if (role !== "ADMIN") {
        validateAuthor(undefined);
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const authorAdmin = async (req: Request, _, next: NextFunction) => {
  try {
    const { id: userId, role } = req.user;

    validateAuthor(userId);
    validateAuthor(role);

    if (role !== "ADMIN") {
      validateAuthor(undefined);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const userAuthor = async (req: Request, _, next: NextFunction) => {
  try {
    const { id: userId } = req.user;
    const { id } = req.params;

    validateAuthor(id);

    const user = await UserService.findById(Number(id));

    if (user.id !== userId) {
      validateAuthor(undefined);
    }

    next();
  } catch (error) {
    next(error);
  }
};
