import { NextFunction, Request, Response } from "express";
import UserService from "../service/userService.js";
import { customResponse } from "../helpers/response.js";
import Validator from "../helpers/validator.js";
import { signToken } from "../helpers/jwt.js";

const { validateToken, validateInput, validatePassword } = Validator;

class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, username, password }: RegisterType = req.body;

      await validateInput(
        ["Email", "Username", "Password"],
        [email, username, password]
      );

      const user = await UserService.create({
        email,
        username,
        password,
      });

      if (!user) {
        throw { name: "ISE" };
      }

      const payload: ResponseUser = {
        email: user.email,
        username: user.username,
      };

      customResponse(res, 201, "Success Register", payload);
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password }: LoginType = req.body;

      await validateInput(["Email", "Password"], [email, password]);

      const user = await UserService.findByEmail(email, password);

      const accessToken = signToken({ id: user.id, email: user.email });

      res.cookie("accesstoken", accessToken, {
        maxAge: 60 * 60 * 1000,
        secure: process.env.NODE !== "production" ? false : true,
        httpOnly: true,
      });

      const payload: ResponseUser = {
        email: user.email,
        username: user.username,
        role: user.role
      };

      customResponse(res, 200, "Success Login", payload);
    } catch (error) {
      next(error);
    }
  }

  static async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { password, confirmPassword } = req.body;
      const { id } = req.user;

      validatePassword(password);
      validatePassword(confirmPassword);

      if (password !== confirmPassword) validatePassword(undefined);

      const user = await UserService.updatePassword(Number(id), password);

      const payload: ResponseUser = {
        email: user.email,
        username: user.username,
      };

      customResponse(res, 200, "Success Change Password", payload);
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const userid = req.user?.id as number;
      const email = req.user?.email;

      validateToken(userid);

      const user = await UserService.findById(userid);

      res.clearCookie("accesstoken");

      const message: string = `${user.email} Logout`;

      customResponse(res, 200, "Success Logout", message);
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
