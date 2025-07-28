import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // ajusta el puerto si es diferente
  withCredentials: false,
});

export default API;
