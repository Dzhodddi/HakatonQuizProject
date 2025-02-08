import axios from "axios";
import { apiBaseUrl } from "src/utils";

const api = axios.create({
  baseURL: `${apiBaseUrl}/`,
  headers: {
    "Content-type": "application/json",
  },
  maxBodyLength: Infinity,
  withCredentials: true,
});

export default api;