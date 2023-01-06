import axiosConfig from './axiosConfig';

export const getPresentations = (roles) => {
  if (roles && roles.length) {
    return axiosConfig.get(`/presentations?roles=${roles.join(',')}`);
  }
  return axiosConfig.get('/presentations');
};

export const createPresentation = (name) => axiosConfig.post('/presentations', { name });
