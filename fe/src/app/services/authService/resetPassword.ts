import { httpClient } from "../httpClient";

export interface ResetPasswordParams {
  password: string;
  token: string;
}

interface ResetPasswordResponse {
  message: string;
}

export const resetPassword = async (params: ResetPasswordParams) => {
  const { data } = await httpClient.post<ResetPasswordResponse>(
    "/auth/reset-password",
    params
  );

  return data;
};
