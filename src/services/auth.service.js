import axiosConfig from './axiosConfig';

export const login = (formData) => axiosConfig.post('/auth/login', formData);
export const register = (formData) => axiosConfig.post('/auth/register', formData);
export const logout = (refreshToken) => axiosConfig.post('/auth/logout', refreshToken);
export const loginWithGoogle = (profile) => axiosConfig.post('/auth/google', profile);
export const verifyEmail = (token) => axiosConfig.get(`/auth/verify-email?token=${token}`);
