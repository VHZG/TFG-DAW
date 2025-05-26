import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/user';

export const createUser = (user) => axios.post(`${REST_API_BASE_URL}/register`, user);

export const checkUser = (user) => axios.post(`${REST_API_BASE_URL}/login`, user);
