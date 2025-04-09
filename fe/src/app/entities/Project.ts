import { ProjectDepartment } from "./ProjectDepartament";
import { Role } from "./Role";
import { StatusProject } from "./StatusProject";

export interface Project {
  id: string;
  name: string;
  description: string;
  status: StatusProject;
  videoLink?: string;
  department: ProjectDepartment;
  createdAt: string;
  updatedAt: string;
  usersProjects: [
    {
      user: {
        id: string;
        name: string;
        email: string;
        role: Role;
        cpf: string;
        position: string;
        baseId: string;
      };
    }
  ];
  files: [];
  evaluations: [];
  questions: [];
  averageScore: {};
}
