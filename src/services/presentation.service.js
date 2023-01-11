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

export const addCollaborator = (presentationId, email) => axiosConfig.post(`/presentations/${presentationId}/collaborators/add`, { email });
export const removeCollaborator = (presentationId, email) => axiosConfig.post(`/presentations/${presentationId}/collaborators/delete`, { email });

export const createPresentation = (name) => axiosConfig.post('/presentations', { name });
export const deletePresentation = (id) => axiosConfig.delete(`/presentations/${id}`);

export const createSlides = (presentationId, slides) => axiosConfig.post(`/presentations/${presentationId}/slides`, { slides });
export const deleteSlides = (presentationId, slides) => axiosConfig.delete(`/presentations/${presentationId}/slides`, { data: { slides } });
export const updateSlides = (presentationId, slides) => axiosConfig.put(`/presentations/${presentationId}/slides`, { slides });

export const createAnswers = (presentationId, slideId, answers) => axiosConfig.post(`/presentations/${presentationId}/slides/${slideId}/answers`, { answers });
export const deleteAnswers = (presentationId, slideId, answers) => axiosConfig.delete(`/presentations/${presentationId}/slides/${slideId}/answers`, { data: { answers } });
export const updateAnswers = (presentationId, slideId, answers) => axiosConfig.put(`/presentations/${presentationId}/slides/${slideId}/answers`, { answers });
