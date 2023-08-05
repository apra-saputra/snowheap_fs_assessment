import * as dotenv from "dotenv";
if (process.env.NODE !== "production") {
  dotenv.config();
}

import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../dist/helpers/bcrypt.js";
import { seedDummyProject } from "./seeds/projects.js";
const prisma = new PrismaClient();

async function seedUsers() {
  const data = [
    {
      username: "admin_test",
      email: "admin@mail.com",
      password: hashPassword("12345"),
      role: "ADMIN",
    },
    {
      username: "user_1",
      email: "user1@mail.com",
      password: hashPassword("123456"),
      role: "USER",
    },
    {
      username: "user_test",
      email: "user_test@mail.com",
      password: hashPassword("123456"),
      role: "USER",
    },
  ];

  await prisma.user.createMany({ data });
}

/**
 * store appkey to db
 */
async function seedApp() {
  const appKey = process.env.APPKEY;
  await prisma.app.createMany({ data: { appKey } });
}

async function main() {
  console.log(`Start seeding ...`);
  await seedUsers();
  await seedApp();

  //dummy project
  if (process.env.NODE !== "production") {
    await seedDummyProject();
  }

  console.log("Seeding complete...");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
