import axios from 'axios';

const BASE_URL = 'https://crudcrud.com/api/0332200c542f4640a549e6f5de11f7b8/members';

export const fetchMembers = async () => {
  return await axios.get(BASE_URL);
};

export const fetchMemberById = async (id) => {
  return await axios.get(`${BASE_URL}/${id}`);
};

export const addMember = async (data) => {
    return await axios.post(BASE_URL, data);
};

export const deleteMember = async (id) => {
  return await axios.delete(`${BASE_URL}/${id}`);
};

export const updateMember = async (id, data) => {
  return await axios.put(`${BASE_URL}/${id}`, data);
};
