import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchTasks = () => axios.get(API_URL);

export const addTask = (task) => axios.post(API_URL, task);

export const updateTask = (id, updatedTask) =>
  axios.patch(`${API_URL}/${id}`, updatedTask);
