import { User } from "../../entities/User";
import { httpClient } from "../httpClient";

export interface GetAllUsersFilters {
  name?: string;
  base?: string[];
}

export const getAll = async (filters: GetAllUsersFilters) => {
  const params = new URLSearchParams();

  if (filters.name) {
    params.append("name", filters.name);
  }

  filters.base?.forEach((base) => {
    params.append("base", base);
  });

  const { data } = await httpClient.get<User[]>(`/users/?${params.toString()}`);
  return data;
};
