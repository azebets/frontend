import axios from 'axios';
import Cookies from 'js-cookie';

export const serverUrl = () => {
    let url = location.hostname === "localhost" || location.hostname === "127.0.0.1" 
    ? "http://localhost:8000" : "https://backend-e2c9.onrender.com"
     return url
}

// Create an Axios instance
const api = axios.create({
  baseURL: serverUrl(), // Base URL for the API
  timeout: 10000, // Request timeout (optional)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor (optional, for adding tokens or logging)
api.interceptors.request.use(
  (config) => {
    // Add authorization token if needed
    const token = Cookies.get('authToken'); // Get token from cookies

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor (optional, for handling errors globally)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally (e.g., show a toast notification)
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;