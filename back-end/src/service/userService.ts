import { hashPassword, isValidPassword } from "../helpers/bcrypt.js";
import prisma from "../init/prisma.js";
import Validator from "../helpers/validator.js";

type UserRequest = {
  email: string;
  username: string;
  password: string;
};

const selected = {
  id: true,
  username: true,
  email: true,
};

const { validateInputRequest } = Validator;

class UserService {
  static async create(data: UserRequest) {
    try {
      await validateInputRequest(data);

      const hashedPassword = hashPassword(data.password);

      return await prisma.user.create({
        data: { ...data, password: hashedPassword, role: "USER" },
        select: selected,
      });
    } catch (error) {
      await prisma.$disconnect();
      throw error;
    }
  }

  static async findById(id: number) {
    try {
      return await prisma.user.findFirstOrThrow({
        where: { id },
        select: { ...selected, role: true },
      });
    } catch (error) {
      await prisma.$disconnect();
      throw error;
    }
  }

  static async findByEmail(email: string, password: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
        select: { ...selected, password: true, role: true },
      });

      if (!user)
        throw { name: "INVALID_LOGIN", message: "invalid email/password" };

      if (!isValidPassword(password, user.password))
        throw { name: "INVALID_LOGIN", message: "invalid email/password" };

      return { id: user.id, username: user.username, email: user.email, role: user.role };
    } catch (error) {
      await prisma.$disconnect();
      throw error;
    }
  }

  static async updatePassword(userId: number, password: string) {
    try {
      await validateInputRequest({ password });

      return await prisma.$transaction(async (tx) => {
        const user = await this.findById(userId);

        const hashedPassword = hashPassword(password);

        return await tx.user.update({
          where: { id: user.id },
          data: { password: hashedPassword },
          select: selected,
        });
      });
    } catch (error) {
      throw error;
    }
  }

  static async compareApp(appKey: string) {
    try {
      const hasAppkey = await prisma.app.findUniqueOrThrow({
        where: { appKey: appKey },
      });
      return hasAppkey ? true : false;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
