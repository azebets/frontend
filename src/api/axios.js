import axios from 'axios';
import { deleteCookie, getCookie } from './cookies';
import { toast } from 'sonner';

export const backendUrl = ()=>{
  let localhostUrl = "http://localhost:8000"
  let remoteUrl = "https://azebets.onrender.com"
  const _api = location.hostname === "localhost" || location.hostname === "127.0.0.1"
  ? localhostUrl : remoteUrl
  return  _api
}

const api = axios.create({
  baseURL: backendUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});
api.interceptors.request.use(
  (config) => {
    // Do Add auth token
    const token = getCookie("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      if(error.response.data === "Authorization token required") {
        deleteCookie("token")
        return  
      }
      toast.error(error.response.data)
    } else if (error.request) {
      console.error('Network Error:', error.request);
      toast.error("Network Error")
    } else {
      console.error('Error:', error.message);
      toast.error(error.message)
    }
    return Promise.reject(error);
  }
);

export default api;