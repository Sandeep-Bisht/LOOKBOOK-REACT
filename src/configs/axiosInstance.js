// axiosInstance.js
import axios from 'axios';
import Cookies from 'universal-cookie';

const baseURL = process.env.REACT_APP_APIURL;

const axiosAuth = axios.create({
  baseURL: baseURL, // Replace with your API base URL
});

axiosAuth.interceptors.request.use(
  (config) => {
    
    const cookies = new Cookies();

    const token = cookies.get('LOOKBOOK_TOKEN');
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const axiosLocal = axios.create({
    baseURL: baseURL, // Replace with your API base URL
  });


export { axiosAuth, axiosLocal };