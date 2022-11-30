import axiosConfig from './axiosConfig';

export const login = (formData) => axiosConfig.post('/auth/login', formData);
