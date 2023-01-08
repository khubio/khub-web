import axiosConfig from './axiosConfig';

export const getPresentations = (roles) => {
  if (roles && roles.length) {
    return axiosConfig.get(`/presentations?roles=${roles.join(',')}`);
  }
  return axiosConfig.get('/presentations');
};

export const getPresentation = (id) => {
  return axiosConfig.get(`/presentations/${id}`);
};

export const createPresentation = (name) => axiosConfig.post('/presentations', { name });

export const createSlides = (presentationId, slides) => axiosConfig.post(`/presentations/${presentationId}/slides`, { slides });
export const deleteSlides = (presentationId, slides) => axiosConfig.delete(`/presentations/${presentationId}/slides`, { data: { slides } });
export const updateSlides = (presentationId, slides) => axiosConfig.put(`/presentations/${presentationId}/slides`, { slides });

export const createAnswers = (presentationId, slideId, answer) => axiosConfig.post(`/presentations/${presentationId}/slides/${slideId}/answers`, answer);
export const deleteAnswers = (presentationId, slideId, answerId) => axiosConfig.delete(`/presentations/${presentationId}/slides/${slideId}/answers`, answerId);
export const updateAnswers = (presentationId, slideId, answer) => axiosConfig.post(`/presentations/${presentationId}/slides/${slideId}/answers`, answer);
