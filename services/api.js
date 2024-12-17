// frontend/src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Backend API URL

const uploadFile = (fileData) => {
  return axios.post(`${API_URL}/upload`, fileData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export default {
  uploadFile,
};
