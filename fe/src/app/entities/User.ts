import { Base } from "./Base";
import { Project } from "./Project";
import { Role } from "./Role";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  cpf: string;
  position: string;
  base: Base;
  usersProjects: {
    project: Project;
  }[];
  /* evaluations: {
    comments: string;
    createdAt: string;
    evaluatorId: string;
    id: string;
    projectId: string;
  }[]; */
}
