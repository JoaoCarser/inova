import { Edition } from "@/app/entities/Edition";
import { httpClient } from "../httpClient";

export const getCurrent = async () => {
  const { data } = await httpClient.get<Edition>(`/editions/current`);
  return data;
};
