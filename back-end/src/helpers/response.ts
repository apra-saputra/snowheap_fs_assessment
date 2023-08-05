import { Response } from "express";

export const customResponse = (
  res: Response,
  statusCode: number,
  statusText: string,
  data?: [] | object | string,
  isArray?: boolean
) => {
  let response: object;

  if (statusText === "ERROR") {
    response = {
      statusCode,
      statusText,
      payload: {
        errorMessage: data,
      },
    };
  } else {
    if (typeof data === "string") {
      response = {
        statusCode,
        statusText,
        payload: {
          message: data,
        },
      };
    } else if (isArray) {
      response = {
        statusCode,
        statusText,
        payload: {
          ...data,
        },
      };
    } else {
      response = {
        statusCode,
        statusText,
        payload: {
          data,
        },
      };
    }
  }

  res.status(statusCode).json(response);
};
