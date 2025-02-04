import { StatusProject } from "./StatusProject";

export interface Project {
  id: string;
  name: string;
  description: string;
  status: StatusProject;
}
