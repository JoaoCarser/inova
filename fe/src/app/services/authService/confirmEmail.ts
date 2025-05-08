import { httpClient } from "../httpClient";

export interface ConfirmEmailParams {
  token: string;
}

interface ConfirmEmailResponse {
  accessToken: string;
}

export const confirmEmail = async (params: ConfirmEmailParams) => {
  const { data } = await httpClient.post<ConfirmEmailResponse>(
    "/auth/confirm-email",
    params
  );

  return data;
};
