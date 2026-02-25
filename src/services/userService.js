import axios from "axios";

const API_URL = "http://localhost:5000/users";

// READ
export const getUsers = () => {
  return axios.get(API_URL);
};

// CREATE
export const addUser = (user) => {
  return axios.post(API_URL, user);
};

// DELETE
export const deleteUser = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};