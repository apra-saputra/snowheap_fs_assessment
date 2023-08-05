import { Status } from "@prisma/client";

type RequestProjectType = {
  name: string;
  description: string;
  status?: Status;
  costs: number;
  target: Date;
  authorId: number;
};

type OptionWhere = {
  name?: string | null;
  status?: string | null;
  target?: {
    gte: Date;
    lte: Date;
  };
  authorId?: Number | null;
};
