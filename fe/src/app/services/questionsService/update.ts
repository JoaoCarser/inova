import { httpClient } from "../httpClient";

interface UpdateQuestionParams {
  response: string;
  questionId: string;
}
export const update = async ({
  response,
  questionId,
}: UpdateQuestionParams) => {
  const { data } = await httpClient.post(`/questions/response/${questionId}`, {
    response,
  });
  return data;
};
