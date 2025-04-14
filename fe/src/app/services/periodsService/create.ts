import { httpClient } from "../httpClient";
import { Period, PeriodType } from "@/app/entities/Period";

export interface CreateProjectParams {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  type: PeriodType;
}

export const create = async (params: CreateProjectParams) => {
  const { data } = await httpClient.post<Period>("/periods", params);
  return data;
};
