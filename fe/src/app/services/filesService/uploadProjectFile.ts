import { httpClient } from "../httpClient";

export interface uploadFileParams {
  projectId: string;
  file: File;
}

export const uploadProjectFile = async ({ file, projectId }: uploadFileParams) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await httpClient.post(`files/project/${projectId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};
