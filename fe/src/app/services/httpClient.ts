import axios from "axios";
import { localStorageKeys } from "../config/localStorageKeys";
//import { timeout } from "../utils/timeout";

export const httpClient = axios.create({
  baseURL: "http://localhost:3000",
});

httpClient.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
