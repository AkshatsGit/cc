import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('creatorcart_token');
  const userStr = localStorage.getItem('creatorcart_user');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      if (user?.id) {
        config.headers['x-user-id'] = user.id;
      }
    } catch (e) {
      // Ignore JSON parse error
    }
  }
  return config;
}, (error) => Promise.reject(error));

export default api;
