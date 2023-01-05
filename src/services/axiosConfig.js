/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import {
  getLocalRefreshToken,
  getLocalAccessToken,
  setTokens,
} from '@utils/localstorageUtil';

const axiosConfig = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
});

axiosConfig.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('tokens')) {
      const accessToken = getLocalAccessToken();
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
          return Promise.reject(_error.response.data);
        }
      }
    }
    return Promise.reject(error.response.data);
  },
);

export default axiosConfig;
