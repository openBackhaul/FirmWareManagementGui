import axios from 'axios';
import { authUtils } from '../utils/authUtils';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || '',
  timeout: 15000,
});

// Request interceptor: inject ONF correlation headers automatically
apiClient.interceptors.request.use(
  (config) => {
    const journey = config.journey || 'general';
    const standardHeaders = authUtils.getHeaders(journey);
    config.headers = {
      ...config.headers,
      ...standardHeaders,
    };
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401/403 and global error reporting
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401 || status === 403) {
        authUtils.clearAuth();
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;


