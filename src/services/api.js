import axios from "axios";

const API_URL = "http://localhost:3001/tasks";

export const fetchTasks = () => axios.get(API_URL);

export const addTask = (task) => axios.post(API_URL, task);

export const updateTask = (id, updatedTask) => axios.patch(`${API_URL}/${id}`, updatedTask);
