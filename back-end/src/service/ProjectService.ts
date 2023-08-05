import prisma from "../init/prisma.js";
import { ProjectPayload, Status, Prisma } from "@prisma/client";
import { RequestProjectType } from "../types/requestProject.js";
import moment from "moment";

const selected = {
  id: true,
  name: true,
  description: true,
  status: true,
  progress: true,
  target: true,
  costs: true,
};

export default class ProjectService {
  static async findAllPagination(
    option: ProjectPayload,
    limit: number,
    skip: number,
    sortBy: string
  ) {
    const [data, count] = await prisma.$transaction([
      prisma.project.findMany({
        where: option,
        take: limit,
        skip: skip * limit,
        orderBy: { [sortBy || "createdAt"]: "desc" },
        select: selected,
      }),
      prisma.project.count({
        where: option,
      }),
    ]);

    return [data, count];
  }

  static async statisticCostByYear(year: number) {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    try {
      return await prisma.$transaction(async (tx) => {
        const stat = await tx.project.aggregate({
          where: {
            AND: [{ target: { gte: startDate, lte: endDate } }],
          },
          _min: { costs: true },
          _max: { costs: true },
          _sum: { costs: true },
          _avg: { costs: true },
        });

        const minProject = await tx.project.findFirstOrThrow({
          where: {
            AND: [
              { target: { gte: startDate, lte: endDate } },
              { costs: stat._min.costs },
            ],
          },
          select: { id: true, name: true, costs: true, target: true },
        });

        const maxProject = await tx.project.findFirstOrThrow({
          where: {
            AND: [
              { target: { gte: startDate, lte: endDate } },
              { costs: stat._max.costs },
            ],
          },
          select: { id: true, name: true, costs: true, target: true },
        });

        const count = await tx.project.count({
          where: { target: { gte: startDate, lte: endDate } },
        });

        return {
          minCosts: minProject,
          maxCosts: maxProject,
          avgCosts: Math.floor(stat._avg.costs),
          totalCosts: stat._sum.costs,
          count: count,
          year: year,
        } as StatistikData;
      });
    } catch (error) {
      await prisma.$disconnect();
      throw error;
    }
  }

  static async progressByFullYear(year: number, statusAry: Status[]) {
    try {
      const startDayYear = `${year}-01-01`;
      const lastDayYear = `${year + 1}-12-30`;

      const query = Prisma.sql`
      SELECT
        DATE_FORMAT(target, '%Y-%m') AS month,
        COUNT(id) AS count,
        SUM(costs) AS costs,
        JSON_ARRAYAGG(JSON_OBJECT('id', id, 'name', name, 'progress', progress, 'costs', costs)) AS progress
      FROM
        project
      WHERE
        status IN (${Prisma.join(statusAry)})
        AND target >= ${startDayYear}
        AND target <= ${lastDayYear}
      GROUP BY
        DATE_FORMAT(target, '%Y-%m');`;

      const project = await prisma.$queryRaw<StatisticFullYearType[]>(query);

      const progress = await generateFullYear(project);

      return progress.map((item) => ({
        ...item,
        count: Number(item.count),
      }));
    } catch (error) {
      await prisma.$disconnect();
      throw error;
    }
  }

  static async findById(id: number) {
    try {
      return await prisma.project.findFirstOrThrow({
        where: { id },
      });
    } catch (error) {
      await prisma.$disconnect();
      throw error;
    }
  }

  static async findByIdAndUserId(projectId: number, userId: number) {
    try {
      return await prisma.project.findFirstOrThrow({
        where: { AND: [{ id: projectId }, { authorId: userId }] },
      });
    } catch (error) {
      await prisma.$disconnect();
      throw error;
    }
  }

  static async createProject(payload: RequestProjectType) {
    try {
      if (new Date(payload.target) < new Date())
        throw { name: "BAD_REQUEST", message: "Invalid target" };

      return await prisma.project.create({
        data: { ...payload, status: "ONPROGRESS" },
        select: { ...selected },
      });
    } catch (error) {
      await prisma.$disconnect();
      throw error;
    }
  }

  static async putProject(projectId: number, payload: RequestProjectType) {
    try {
      if (new Date(payload.target) < new Date())
        throw { name: "BAD_REQUEST", message: "Invalid target" };

      return await prisma.$transaction(async (tx) => {
        const project = await this.findById(projectId);

        return await tx.project.update({
          where: { id: project.id },
          data: payload,
          select: { ...selected },
        });
      });
    } catch (error) {
      await prisma.$disconnect();
      throw error;
    }
  }

  static async patchProject(id: number, column: string, value: any) {
    try {
      if (column === "progress" && (value > 100 || value < 0)) {
        throw { message: `Invalid ${column}`, name: "BAD_REQUEST" };
      }

      return await prisma.$transaction(async (tx) => {
        const data = await this.findById(id);

        return await tx.project.update({
          where: { id: data.id },
          data: { [column]: value },
          select: selected,
        });
      });
    } catch (error) {
      await prisma.$disconnect();
      throw error;
    }
  }

  static async deleteProject(id: number) {
    try {
      return await prisma.$transaction(async (tx) => {
        const data = await this.findById(id);

        return await tx.project.delete({
          where: { id: data.id },
          select: { id: true, name: true },
        });
      });
    } catch (error) {
      await prisma.$disconnect();
      throw error;
    }
  }
}

const generateFullYear: (
  array: StatisticFullYearType[]
) => Promise<StatisticFullYearType[]> = (array: StatisticFullYearType[]) => {
  moment.locale("id");
  const monthList = moment.months();

  return new Promise((resolve, reject) => {
    const result = monthList.map((month, index) => {
      const data = array.find(
        (item) => new Date(item.month).getMonth() === index
      );

      const count = data ? data.count : 0;
      const progress = count ? data.progress : [];
      const costs = count ? data.costs : 0;

      return { month, count, progress, costs };
    });

    resolve(result);

    if (array.length === 0) {
      reject("there is no data");
    }
  });
};
