import { httpClient } from "../httpClient";
import { CreateEditionParams } from "./create";
import { Edition } from "@/app/entities/Edition";

export interface UpdateEditionParams extends CreateEditionParams {
  id: string;
}

export const update = async ({ id, ...params }: UpdateEditionParams) => {
  const { data } = await httpClient.put<Edition>(`/editions/${id}`, params);
  return data;
};
