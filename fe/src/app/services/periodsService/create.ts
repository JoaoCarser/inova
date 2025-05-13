import { httpClient } from "../httpClient";
import { Period, PeriodType } from "@/app/entities/Period";

export interface CreatePeriodsParams {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  type: PeriodType;
}

export const create = async (params: CreatePeriodsParams) => {
  const { data } = await httpClient.post<Period>("/periods", params);
  return data;
};
