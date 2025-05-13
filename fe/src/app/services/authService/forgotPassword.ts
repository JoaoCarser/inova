import { httpClient } from "../httpClient";

export interface ForgotPasswordParams {
  email: string;
}

interface ForgotPasswordResponse {
  message: string;
}

export const forgotPassword = async (params: ForgotPasswordParams) => {
  const { data } = await httpClient.post<ForgotPasswordResponse>(
    "/auth/forgot-password",
    params
  );

  return data;
};
