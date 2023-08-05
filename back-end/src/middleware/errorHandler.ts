import { NextFunction, Request, Response } from "express";
import { customResponse } from "../helpers/response.js";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // for logging
  console.error("ERROR.NAME :", err.name, "ERROR :", err);

  let code: number, message: string;

  switch (err.name) {
    case "INVALID_LOGIN":
      code = 400;
      message = err.message;
      break;
    case "BAD_REQUEST":
      code = 400;
      message = err.message;
      break;
    case "PrismaClientValidationError":
      code = 400;
      const errorMessageParts = err.message.split("Expected");
      if (errorMessageParts.length >= 2) {
        message = `Invalid ${errorMessageParts[1].trim()}`;
      }
      break;
    case "INVALID_TOKEN":
      code = 401;
      message = err.message;
      break;
    case "UNAUTHORIZED":
      code = 403;
      message = err.message;
      break;
    case "NOT_FOUND":
      code = 404;
      message = err.message;
      break;
    case "NotFoundError":
      code = 404;
      message = err.message;
      break;
    case "PrismaClientKnownRequestError":
      code = 500;
      message = err.message;
      break;
    default:
      (code = 500), (message = "Internal Server Error");
      break;
  }

  customResponse(res, code, "ERROR", message);
};
