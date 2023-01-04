/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import {
  getLocalRefreshToken,
  setTokens,
} from '@utils/localstorageUtil';

const axiosConfig = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosConfig.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('tokens')) {
      const accessToken = JSON.parse(localStorage.getItem('tokens')).access
        .token;
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
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
  async (error) => {
    const originalConfig = error.config;
    if (originalConfig.url !== '/auth/login' && error.response) {
      // Access Token was expired
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const tokens = await axiosConfig.post('/auth/refresh-tokens', {
            refreshToken: getLocalRefreshToken(),
          });
          setTokens(tokens);
          return axiosConfig(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(error);
  },
);

export default axiosConfig;
