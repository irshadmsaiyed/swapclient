import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://test-swap10.herokuapp.com/api/v1/',
  baseURL: 'https://swapserver.onrender.com/api/v1/',
  // baseURL: 'http://localhost:3008/api/v1/',
});

export default api;
