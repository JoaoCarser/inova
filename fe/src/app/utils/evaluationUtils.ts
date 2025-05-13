import { Evaluation } from "../entities/Evaluation";

interface ScoreResult {
  averageScore: number;
  evaluationCount: number;
  criteriaAverages: Record<string, number>;
}

export function calculateAverageScore(evaluations: Evaluation[] = []): ScoreResult {
  if (!evaluations || evaluations.length === 0) {
    return {
      averageScore: 0,
      evaluationCount: 0,
      criteriaAverages: {},
    };
  }

  // Calculate overall average
  let totalScore = 0;
  let totalCriteria = 0;

  // Track averages by criterion
  const criteriaScores: Record<string, { total: number; count: number }> = {};

  // Process each evaluation
  evaluations.forEach((evaluation) => {
    if (evaluation.criteria && evaluation.criteria.length > 0) {
      evaluation.criteria.forEach((criterion) => {
        // Add to overall score
        totalScore += criterion.score;
        totalCriteria++;

        // Track by criterion type
        const criterionName = criterion.name;
        if (!criteriaScores[criterionName]) {
          criteriaScores[criterionName] = { total: 0, count: 0 };
        }
        criteriaScores[criterionName].total += criterion.score;
        criteriaScores[criterionName].count++;
      });
    }
  });

  // Calculate averages by criterion
  const criteriaAverages: Record<string, number> = {};
  Object.entries(criteriaScores).forEach(([criterion, { total, count }]) => {
    criteriaAverages[criterion] = count > 0 ? total / count : 0;
  });

  return {
    averageScore: totalCriteria > 0 ? totalScore / totalCriteria : 0,
    evaluationCount: evaluations.length,
    criteriaAverages,
  };
}
