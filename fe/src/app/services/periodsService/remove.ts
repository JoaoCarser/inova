import { httpClient } from "../httpClient";

export const remove = async (periodId: string) => {
  const { data } = await httpClient.delete(`/periods/${periodId}`);
  return data;
};
