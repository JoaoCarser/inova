import { httpClient } from "../httpClient";
import { CreatePeriodsParams } from "../periodsService/create";
import { Edition } from "@/app/entities/Edition";

export interface CreateEditionParams {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  year: number;
  periods: CreatePeriodsParams[];
}

export const create = async (params: CreateEditionParams) => {
  const { data } = await httpClient.post<Edition>("/editions", params);
  return data;
};
