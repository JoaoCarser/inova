import { EvaluationCriterion } from "@/app/entities/EvaluationCriterion";
import { httpClient } from "../httpClient";

interface UpdateEvaluationParams {
  id: string;
  comments: string;
  projectId: string;
  criteria: EvaluationCriterion[];
}

export const update = async ({ id, ...params }: UpdateEvaluationParams) => {
  const { data } = await httpClient.put(`/evaluations/${id}`, params);

  return data;
};
