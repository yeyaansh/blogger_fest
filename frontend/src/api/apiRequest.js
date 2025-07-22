// src/api/apiClient.js

import axios from 'axios';

// Determine the baseURL based on the environment
const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://vergedraft.vercel.app/' // Production URL
  : 'http://localhost:3445'; // Development URL

// Create a new Axios instance
const apiClient = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

// Export the configured instance
export default apiClient;