import bcrypt from "bcrypt";

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, 10);
};

export const isValidPassword = (password: string, hashedPassword: string) => {
  return bcrypt.compareSync(password, hashedPassword);
};
