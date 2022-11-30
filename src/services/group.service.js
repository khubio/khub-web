import axiosConfig from './axiosConfig';

export const getGroupsOfUser = (userId) => axiosConfig.get('/groups', {
  params: {
    userId,
  },
});
export const createGroup = (body) => axiosConfig.post('/groups', body);
export const getGroupById = (id) => axiosConfig.get(`/groups/${id}`);
export const updateGroupById = (id, body) => axiosConfig.patch(`/group/${id}`, body);
