import jwt, { Secret } from "jsonwebtoken";

const privateKey = process.env.SECRET_KEY as Secret;

type TokenReqType = { id: number; email: string };
export type TokenPayloadType = {
  id: number;
  email: string;
  iat: number;
  exp: number;
};

export const signToken = ({ id, email }: TokenReqType) => {
  return jwt.sign({ id, email }, privateKey, { expiresIn: "24H" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, privateKey) as TokenPayloadType;
};
