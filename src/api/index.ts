import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const url = 'https://localhost:5001/api';

const api: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Encoding': 'gzip, deflate, br',
  },
});

// Request interceptor to add authorization token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('access-token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

