import axios from "axios";
import { localStorageKeys } from "../config/localStorageKeys";
//import { timeout } from "../utils/timeout";

export const httpClient = axios.create({
  baseURL: "http://192.168.0.11:3000/",
});

httpClient.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
