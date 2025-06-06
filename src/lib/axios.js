import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

// this interceptor will be for every request
axiosInstance.interceptors.request.use(
    (config) => {
        /// this will make it a lot easier to add token to every request 
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;