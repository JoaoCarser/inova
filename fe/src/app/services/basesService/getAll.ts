import { Base } from "@/app/entities/Base";
import { httpClient } from "../httpClient";

export const getAll = async () => {
  const { data } = await httpClient.get<Base[]>(`/bases`);
  return data;
};
