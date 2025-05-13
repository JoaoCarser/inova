import { httpClient } from "../httpClient";
import { Period } from "@/app/entities/Period";

export const getAll = async () => {
  const { data } = await httpClient.get<Period[]>(`/periods`);
  return data;
};
