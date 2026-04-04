import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // replace 5000 with your backend port
  withCredentials: true, // for sending cookies (auth)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;