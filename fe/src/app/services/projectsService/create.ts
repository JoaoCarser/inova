import { StatusProject } from "@/app/entities/StatusProject";
import { httpClient } from "../httpClient";
import { ProjectDepartment } from "@/app/entities/ProjectDepartament";

export interface CreateProjectParams {
  name: string;
  description: string;
  status: StatusProject;
  department: ProjectDepartment;
  videoLink?: string;
  participants: { id: string; name: string; email: string }[];
}

export interface CreateProjectResponse {
  id: string;
  name: string;
  description: string;
  status: StatusProject;
  department: ProjectDepartment;
  videoLink?: string;
}

export const create = async (params: CreateProjectParams) => {
  const { data } = await httpClient.post<CreateProjectResponse>("/projects", params);
  return data;
};
