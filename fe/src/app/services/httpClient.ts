import axios from "axios";
import { localStorageKeys } from "../config/localStorageKeys";
//import { timeout } from "../utils/timeout";

//const localhostUrl = "http://localhost:3000/";

export const httpClient = axios.create({
  baseURL: "https://organic-orbit-v6g9xj9w5472p5x6-3000.app.github.dev/",
});

httpClient.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
