import axios from "axios";
import { localStorageKeys } from "../config/localStorageKeys";
//import { timeout } from "../utils/timeout";

//const localhostUrl = "http://localhost:3000/";
const prodUrl = "https://inova-x6hb.onrender.com";

export const httpClient = axios.create({
  baseURL: prodUrl,
});

httpClient.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
