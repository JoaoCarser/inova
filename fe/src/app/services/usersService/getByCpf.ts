import { User } from "../../entities/User";
import { httpClient } from "../httpClient";

export const getByCpf = async (cpf: string) => {
  const { data } = await httpClient.get<User>(`/users/cpf/${cpf}`);
  return data;
};
