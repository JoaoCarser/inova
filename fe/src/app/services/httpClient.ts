import axios from "axios";
import { localStorageKeys } from "../config/localStorageKeys";
//import { timeout } from "../utils/timeout";

const localhostUrl = "http://localhost:3000/";
const test = "https://437923df-3000.brs.devtunnels.ms/";

export const httpClient = axios.create({
  baseURL: localhostUrl,
});

httpClient.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
