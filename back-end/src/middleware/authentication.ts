import { NextFunction, Request } from "express";
import { TokenPayloadType, verifyToken } from "../helpers/jwt.js";
import Validator from "../helpers/validator.js";
import UserService from "../service/userService.js";

const { validateToken } = Validator;

export const authentication = async (req: Request, _, next: NextFunction) => {
  try {
    const accesstoken = req.cookies.accesstoken;

    validateToken(accesstoken);

    const payload: TokenPayloadType = verifyToken(accesstoken);

    validateToken(payload);

    const user = await UserService.findById(payload.id);

    validateToken(user);

    req.user = { id: user.id, email: user.email, role: user.role };

    next();
  } catch (error) {
    next(error);
  }
};

export const appkey = async (req: Request, _, next: NextFunction) => {
  try {
    const { "x-app-key": xAppKey } = req.headers;

    validateToken(xAppKey);

    if (xAppKey !== process.env.APPKEY) validateToken(undefined);

    await UserService.compareApp(xAppKey as string);

    next();
  } catch (error) {
    next(error);
  }
};
