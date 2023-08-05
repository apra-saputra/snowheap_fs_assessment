import { NextFunction, Request, Response } from "express";
import { customResponse } from "../helpers/response.js";
import ProjectService from "../service/ProjectService.js";
import { Status } from "@prisma/client";

export default class DashboardController {
  static async getFullYearProgress(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { year, status } = req.query;

      const paramsYear = year ? Number(year) : new Date().getFullYear();
      let paramsStatus: Status[] = [];

      if (!status) {
        paramsStatus.push("ONPROGRESS", "PENDING");
      } else {
        paramsStatus.push(status as Status);
      }

      const progress = await ProjectService.progressByFullYear(
        paramsYear,
        paramsStatus
      );

      const statistic = await ProjectService.statisticCostByYear(paramsYear);

      customResponse(
        res,
        200,
        "Success Get Dashboard",
        {
          statistic,
          progress,
        },
        true
      );
    } catch (error) {
      next(error);
    }
  }
}
