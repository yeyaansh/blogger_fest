// src/api/apiClient.js

import axios from 'axios';

// Create a new Axios instance with a custom configuration
const apiClient = axios.create({
  // The base URL of your API
  baseURL: 'http://localhost:3445', 
  
  // This will be sent with every request
  withCredentials: true, 

  // You can add other default settings here, like headers
  // headers: {
  //   'Content-Type': 'application/json',
  //   'X-Requested-With': 'XMLHttpRequest',
  // },
});

// Export the configured instance to be used throughout your app
export default apiClient;