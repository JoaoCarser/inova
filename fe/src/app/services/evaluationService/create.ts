import { EvaluationCriterion } from "@/app/entities/EvaluationCriterion";
import { httpClient } from "../httpClient";

interface CreateEvaluationParams {
  comments: string;
  projectId: string;
  criteria: EvaluationCriterion[];
}

export const create = async (params: CreateEvaluationParams) => {
  const { data } = await httpClient.post("/evaluations", params);

  return data;
};
