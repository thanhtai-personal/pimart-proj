import { HttpClient } from "./httpClient";

//https://sheet.best/admin/connection-detail/1a333819-2e5e-47ad-9975-795b9ef31c0f
export const backendHttpClient = new HttpClient({
  baseURL: "https://sheet.best",
});

export const autoForm = async (data) => {
  return await backendHttpClient.post(
    "/api/sheets/1a333819-2e5e-47ad-9975-795b9ef31c0f",
    data
  );
};
//https://sheet.best/api/sheets/a8874900-9219-4f1b-aa2d-cc5a11048730
export const saveMorningData = async (data) => {
  return await backendHttpClient.post(
    "/api/sheets/a8874900-9219-4f1b-aa2d-cc5a11048730",
    data
  );
};
