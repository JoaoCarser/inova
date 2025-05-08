import { Role } from "@/app/entities/Role";
import { httpClient } from "../httpClient";

export interface SignupParams {
  name: string;
  email: string;
  password: string;
  role: Role;
  cpf: string;
  position: string;
  baseId: string;
}

interface SignupResponse {
  message: string;
}

export const signup = async (params: SignupParams) => {
  //await timeout(1500);
  const { data } = await httpClient.post<SignupResponse>(
    "/auth/signup",
    params
  );

  return data;
};
