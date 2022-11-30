import axiosConfig from './axiosConfig';

export const getGroupsOfUser = (userId) => axiosConfig.get('/groups', {
  params: {
    userId,
  },
});

export const createGroup = (body) => axiosConfig.post('/groups', body);
export const getGroupById = (id) => axiosConfig.get(`/groups/${id}`);
export const updateGroupById = (id, body) => axiosConfig.patch(`/group/${id}`, body);

export const updateUserGroupById = (id, body) => axiosConfig.patch(`/group/${id}/members`, body);
export const deleteUserGroupById = (id, body) => axiosConfig.delete(`/group/${id}/members`, body);
