import axios from "axios";

const API_URL = "http://localhost:5000/tasks";

// READ
export const getTasks = () => {
  return axios.get(API_URL);
};

// CREATE
export const addTask = (task) => {
  return axios.post(API_URL, task);
};

// DELETE
export const deleteTask = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

// UPDATE
export const updateTask = (id, task) => {
  return axios.put(`${API_URL}/${id}`, task);
};
