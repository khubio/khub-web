import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
});

axiosConfig.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
axiosConfig.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return error.response.data;
  },
);

export default axiosConfig;
