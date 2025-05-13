import { httpClient } from "../httpClient";

export const remove = async (projectId: string) => {
  const { data } = await httpClient.delete(`/projects/${projectId}`);
  return data;
};
