import { Evaluation } from "./Evaluation";
import { ProjectDepartment } from "./ProjectDepartament";
import { Role } from "./Role";
import { StatusProject } from "./StatusProject";

export interface ProjectFile {
  id: string;
  key: string;
  path: string;
  projectId: string;
  userId: string;
  originalName: string;
}

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
  files: ProjectFile[];
  evaluations: Evaluation[];
  questions: [];
  averageScore: {};
}
