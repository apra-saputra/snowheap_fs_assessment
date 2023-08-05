import { NextFunction, Request, Response } from "express";
import { customResponse } from "../helpers/response.js";
import { ProjectPayload, Status } from "@prisma/client";
import ProjectService from "../service/ProjectService.js";
import { OptionWhere, RequestProjectType } from "../types/requestProject.js";
import Validator from "../helpers/validator.js";

const { validateInput } = Validator;

export default class ProjectController {
  static async getProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userid, role } = req.user;
      let { limit, skip, sortBy, status, name, startDate, endDate } = req.query;

      limit = limit || "10";
      skip = skip || "0";

      let option: OptionWhere = {};

      if (role !== "ADMIN") {
        console.log(userid, role, "user");
        option.authorId = userid;
      }
      if (name) {
        name = name.toString().toLowerCase();
        option = { name: { contains: name } as any };
      }
      if (status) {
        option = { status: status as string };
      }
      if (startDate && endDate) {
        option.target = {
          gte: new Date(startDate.toString()),
          lte: new Date(endDate.toString()),
        };
      }

      const [data, count] = await ProjectService.findAllPagination(
        option as ProjectPayload,
        Number(limit),
        Number(skip),
        sortBy as string
      );

      customResponse(
        res,
        200,
        "Success Get Projects",
        {
          data,
          count: count,
          limit: Number(limit),
          skip: Number(skip),
        },
        true
      );
    } catch (error) {
      next(error);
    }
  }

  static async createProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, costs, target }: RequestProjectType = req.body;

      const { id } = req.user;

      await validateInput(
        ["Name", "Description", "Costs", "Target"],
        [name, description, costs, target]
      );

      const project = await ProjectService.createProject({
        name,
        description,
        costs,
        target: new Date(target),
        authorId: id,
      });

      customResponse(res, 201, "Success Create Project", project);
    } catch (error) {
      next(error);
    }
  }

  static async getProjectById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: projectId } = req.params;

      const project = await ProjectService.findById(Number(projectId));

      customResponse(res, 200, "Success Get Project", project);
    } catch (error) {
      next(error);
    }
  }

  static async updateProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, costs, target }: RequestProjectType = req.body;

      const { id: projectId } = req.params;

      const { id } = req.user;

      await validateInput(
        ["Name", "Description", "Costs", "Target"],
        [name, description, costs, target]
      );

      const project = await ProjectService.putProject(Number(projectId), {
        name,
        description,
        costs,
        target: new Date(target),
        authorId: id,
      });

      customResponse(res, 200, "Success Update Project", project);
    } catch (error) {
      next(error);
    }
  }

  static async patchProgressProject(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { progress } = req.body;
      const { id } = req.params;

      await validateInput("Progress", progress);

      const project = await ProjectService.patchProject(
        Number(id),
        "progress",
        progress
      );

      customResponse(res, 200, "Success Patch Progress Project", project);
    } catch (error) {
      next(error);
    }
  }

  static async patchStatusProject(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { status }: { status: Status } = req.body;
      const { id } = req.params;

      await validateInput("Status", status);

      const project = await ProjectService.patchProject(
        Number(id),
        "status",
        status
      );

      customResponse(res, 200, "Success Patch Status Project", project);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const project = await ProjectService.deleteProject(Number(id));

      customResponse(res, 200, "Success Delete Project", project);
    } catch (error) {
      next(error);
    }
  }
}
