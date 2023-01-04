import axiosConfig from './axiosConfig';

export const getGroupsOfUser = (roles) => {
  if (roles && roles.length) {
    return axiosConfig.get(`/groups?roles=${roles.join(',')}`);
  }
  return axiosConfig.get('/groups');
};

export const createGroup = (body) => axiosConfig.post('/groups', body);
export const getGroupById = (id) => axiosConfig.get(`/groups/${id}`);
export const updateGroupById = (id, body) => axiosConfig.patch(`/group/${id}`, body);

export const updateUserGroupById = (id, body) => axiosConfig.patch(`/group/${id}/members`, body);
export const deleteUserGroupById = (id, body) => axiosConfig.delete(`/group/${id}/members`, body);
