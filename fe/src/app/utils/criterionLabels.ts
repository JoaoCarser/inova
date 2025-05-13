import { EvaluationCriterionName } from "../entities/EvaluationCriterionName";

export const criterionLabels: Record<EvaluationCriterionName, string> = {
  [EvaluationCriterionName.CREATIVITY]: "Criatividade",
  [EvaluationCriterionName.ORIGINALITY]: "Originalidade",
  [EvaluationCriterionName.UTILITY]: "Utilidade",
  [EvaluationCriterionName.FEASIBILITY]: "Viabilidade",
  [EvaluationCriterionName.IMPACT]: "Impacto",
  [EvaluationCriterionName.STRATEGIC_ALIGNMENT]: "Alinhamento Estratégico",
  [EvaluationCriterionName.CLARITY]: "Clareza",
  [EvaluationCriterionName.TECHNICAL_FEASIBILITY]: "Viabilidade Técnica",
  [EvaluationCriterionName.INNOVATION]: "Inovação",
};
