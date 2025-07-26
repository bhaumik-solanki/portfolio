import axios from 'axios';

const API_BASE = process.env.REACT_APP_BACKEND_URL + '/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Portfolio API
export const portfolioAPI = {
  getPortfolio: () => apiClient.get('/portfolio'),
  initPortfolio: () => apiClient.post('/portfolio/init'),
};

// Contact API
export const contactAPI = {
  sendMessage: (data) => apiClient.post('/contact', data),
  getMessages: () => apiClient.get('/contact'),
};

// Generic API utilities
export const apiUtils = {
  handleError: (error) => {
    if (error.response) {
      // Server responded with error status
      return {
        message: error.response.data.detail || 'Server error occurred',
        status: error.response.status,
      };
    } else if (error.request) {
      // Request was made but no response
      return {
        message: 'Network error - please check your connection',
        status: 0,
      };
    } else {
      // Something else happened
      return {
        message: error.message || 'An unexpected error occurred',
        status: 0,
      };
    }
  },
  
  isNetworkError: (error) => {
    return !error.response && error.request;
  },
  
  isServerError: (error) => {
    return error.response && error.response.status >= 500;
  },
};

export default apiClient;