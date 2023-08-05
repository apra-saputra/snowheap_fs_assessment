import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

export const seedDummyProject = async () => {
  /**
   * example
  
    const data = [
      {
        name: "AI Study",
        description: "lorem ipsum dorse koerez leocr leo grope crapse keoli",
        status: "ONPROGRESS",
        costs: 1_000_000_000,
        target: new Date("2024-05-22"),
        progress: 10,
        authorId: 2,
      },
      {
        ....
      }
    ];
   */

  function random(digit, length) {
    return Math.floor(Math.random(digit) * length);
  }

  const projects = JSON.parse(fs.readFileSync("./MOCK_DATA.json")).map(
    (item) => {
      item.name = "AI " + item.name;
      item.costs = Number(item.costs);
      if (item.status === "DONE") {
        item.progress = 100;
        item.target = new Date();
      } else {
        item.target = new Date(item.target);
        item.progress = random(10, 100);
      }
      return item;
    }
  );

  await prisma.project.createMany({ data: projects });
};
