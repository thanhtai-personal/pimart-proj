import { HttpClient } from "./httpClient";

export const backendHttpClient = new HttpClient({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getUserDetail = async (userId: string) => {
  return await backendHttpClient.get(`/api/users/${userId}`);
};

export const autoForm = async (data) => {
  return await backendHttpClient.post(`/`, data);
};
