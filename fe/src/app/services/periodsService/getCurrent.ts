import { httpClient } from "../httpClient";
import { Period } from "@/app/entities/Period";

export const getCurrent = async () => {
  const { data } = await httpClient.get<Period>(`/periods/current`);
  return data;
};
