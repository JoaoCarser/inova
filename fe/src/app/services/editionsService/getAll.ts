import { Edition } from "@/app/entities/Edition";
import { httpClient } from "../httpClient";

export const getAll = async () => {
  const { data } = await httpClient.get<Edition[]>(`/editions`);
  return data;
};
