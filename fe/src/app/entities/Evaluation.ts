export interface Evaluation {
  id: string;
  createdAt: string;
  comments: string;
  evaluatorId: string;
  criteria: Criteria[];
}

export interface Criteria {
  id: string;
  name: string;
  score: number;
}
