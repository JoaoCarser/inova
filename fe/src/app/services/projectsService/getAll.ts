import { Project } from "@/app/entities/Project";
import { httpClient } from "../httpClient";

export interface ProjectFilters {
  title?: string;
  status?: string[];
  department?: string[];
}

export const getAll = async (filters: ProjectFilters = {}) => {
  const params = new URLSearchParams();

  if (filters.title) {
    params.append("title", filters.title);
  }

  filters.status?.forEach((status) => {
    params.append("status", status);
  });

  filters.department?.forEach((department) => {
    params.append("department", department);
  });

  const { data } = await httpClient.get<Project[]>(`/projects/?${params.toString()}`);
  return data;
};
