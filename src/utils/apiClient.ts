import axios from 'axios';
import { API_CONFIG } from '../config/api';
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL, // 🔧 Change this to your API base URL
  timeout: 10000, // optional
});

apiClient.interceptors.request.use(
  async config => {
    // Example: Add token
    // const token = await getAuthToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (error.response) {
      const { status } = error.response;
      console.error(`[Response Error] ${status}:`, error.response.data);
    } else {
      console.error('Network error:', error.message);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
