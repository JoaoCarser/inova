import { Project } from "@/app/entities/Project";
import { httpClient } from "../httpClient";

export interface ProjectFilters {
  title?: string;
  status?: string[];
  department?: string[];
}

export const getById = async (projectId: string) => {
  const { data } = await httpClient.get<Project>(`/projects/${projectId}`);
  return data;
};
