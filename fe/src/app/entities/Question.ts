export interface Question {
  authorId: string;
  createdAt: string;
  id: string;
  projectId: string;
  respondedAt?: string;
  response?: string;
  status: StatusQuestion;
  text: string;
  recipientId: string;
  author: {
    name: string;
    email: string;
    id: string;
  };
}

export enum StatusQuestion {
  SUBMITED = "SUBMITED",
  VIEWED = "VIEWED",
  COMPLETED = "COMPLETED",
  ANSWERED = "ANSWERED",
  PENDING = "PENDING",
}
