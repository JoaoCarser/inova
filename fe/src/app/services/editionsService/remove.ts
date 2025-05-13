import { httpClient } from "../httpClient";

export const remove = async (periodId: string) => {
  const { data } = await httpClient.delete(`/editions/${periodId}`);
  return data;
};
