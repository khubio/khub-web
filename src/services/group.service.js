import axiosConfig from './axiosConfig';

export const getGroupsOfUser = (roles) => {
  if (roles && roles.length) {
    return axiosConfig.get(`/groups?roles=${roles.join(',')}`);
  }
  return axiosConfig.get('/groups');
};

export const createGroup = (name) => axiosConfig.post('/groups', { name });
export const getGroupById = (id, roles) => {
  if (roles && roles.length) {
    return axiosConfig.get(`/groups/${id}?roles=${roles.join(',')}`);
  }
  return axiosConfig.get(`/groups/${id}`);
};

export const groupJoin = (id) => axiosConfig.get(`groups/${id}/join`);
export const joinGroup = (id) => axiosConfig.post(`groups/${id}/join`);
export const inviteToGroupByEmail = (groupId, email) => axiosConfig.post(`/groups/${groupId}/invite-by-email`, { email });
export const deleteGroupById = (id) => axiosConfig.delete(`groups/${id}`);
export const getRoleInGroup = (id) => axiosConfig.get(`groups/${id}/role`);
export const updateUserGroupById = (id, body) => axiosConfig.patch(`/groups/${id}/members`, body);
export const deleteUserGroupById = (id, body) => axiosConfig.delete(`/groups/${id}/members`, { data: { ...body } });
