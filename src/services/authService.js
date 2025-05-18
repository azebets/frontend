import api from '../utils/api';

// User login
export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

// User registration
export const register = async (data) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

// Fetch user profile
export const getUserProfile = async () => {
  const response = await api.get('/auth/profile');
  return response.data;
};