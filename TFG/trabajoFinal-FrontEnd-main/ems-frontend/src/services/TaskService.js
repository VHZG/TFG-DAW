import axios from "axios";

const REST_API_BASE_URL = 'https://tfg-daw-production.up.railway.app/api/tasks'

export const listTasks = () => axios.get(REST_API_BASE_URL)

export const listCategories = () => axios.get(`${REST_API_BASE_URL}/allCategories`)

export const createTask = (task) => axios.post(REST_API_BASE_URL, task)

export const getTask = (taskId) => axios.get(REST_API_BASE_URL + '/' + taskId)

export const getTaskByStatus = (status) => axios.get(REST_API_BASE_URL + `/status/${status}`)

export const updateTask = (taskId, task) => axios.put(REST_API_BASE_URL + '/' + taskId, task)

export const deleteTask = (taskId) => axios.delete(REST_API_BASE_URL + '/' + taskId)