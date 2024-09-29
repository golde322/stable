import axios, { type AxiosInstance } from 'axios';

// axios instance for the API. it will be used in the redux thunk actions
export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
