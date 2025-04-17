import { httpClient } from "../httpClient";

export interface removeFileParams {
  projectId: string;
  fileId: string;
}

export const remove = async ({ fileId, projectId }: removeFileParams) => {
  const { data } = await httpClient.delete(`files/project/${projectId}/${fileId}`);

  return data;
};
