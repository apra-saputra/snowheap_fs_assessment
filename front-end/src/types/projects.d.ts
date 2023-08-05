interface PayloadFetchProjects {
  projects: ProjectType[];
  count: number;
}

interface BodyParamsProject {
  name: string;
  description: string;
  costs: number;
  target: string;
}

interface ProjectType {
  id: number;
  name: string;
  description: string;
  status: Status;
  progress: number;
  target: date;
  costs: number;
}

type Status = "DONE" | "ONPROGRESS" | "PENDING";

interface ParamsFetchProject {
  limit?: number;
  skip?: number;
  sortBy?: string;
  status?: string;
  name?: name;
  startDate?: string;
  endDate?: string;
}
