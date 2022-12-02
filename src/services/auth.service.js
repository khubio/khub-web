import axiosConfig from './axiosConfig';

export const login = (formData) => axiosConfig.post('/auth/login', formData);
export const register = (formData) => axiosConfig.post('/auth/register', formData);
export const logout = () => axiosConfig.post('/auth/logout');
export const loginWithGoogle = (profile) => axiosConfig.post('/auth/google', profile);
