import { StatusProject } from "@/app/entities/StatusProject";
import { httpClient } from "../httpClient";
import { ProjectDepartment } from "@/app/entities/ProjectDepartament";
import { CreateProjectParams } from "./create";

export interface UpdateProjectParams extends CreateProjectParams {
  id: string;
}

export interface UpdateProjectResponse {
  id: string;
  name: string;
  description: string;
  status: StatusProject;
  department: ProjectDepartment;
  videoLink?: string;
}

export const update = async (params: UpdateProjectParams) => {
  const { data } = await httpClient.put<UpdateProjectResponse>(
    `/projects/${params.id}`,
    params
  );
  return data;
};
