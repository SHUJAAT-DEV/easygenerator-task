import { API_ENDPOINTS } from "../utils/apiEndpoints";
import http from "./http";

export const REQUEST_TEMPLATE = (endpoint: string) => ({
  create: async (requestBody: any) => http.post(endpoint, requestBody),
  update: async (id: any, requestBody: string) =>
    http.post(`${endpoint}/${id}`, requestBody),
  updatePatch: async (id: any, requestBody: any) =>
    http.patch(`${endpoint}/${id}`, requestBody),
  delete: async (id: any) => http.delete(`${endpoint}/${id}`, {}),
  getAll: async () => http.get(`${endpoint}`),
  getById: async (id: any) => http.get(`${endpoint}/${id}`, {}),
});

const Auth = {
  login: REQUEST_TEMPLATE(API_ENDPOINTS.LOGIN).create,
  signup: REQUEST_TEMPLATE(API_ENDPOINTS.REGISTER).create,
};

export { Auth };
