import { httpClient } from "../httpClient";

export interface CreateQuestionParams {
  text: string;
  projectId: string;
}
export const create = async (params: CreateQuestionParams) => {
  const { data } = await httpClient.post("/questions", params);
  return data;
};
