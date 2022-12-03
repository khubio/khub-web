import axiosConfig from './axiosConfig';

export const changePassword = (userId, formData) => axiosConfig.post(`/users/${userId}/change-password`, formData);
