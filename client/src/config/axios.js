import axios from 'axios';

const service = axios.create({
    baseURL: typeof window === 'undefined' ? 'http://localhost:4000/' : "/api",
    timeout: 30000,
    withCredentials: true,
    headers: { 'Content-Type': 'text/plain', charset: 'UTF-8' },
});

service.interceptors.request.use((config) => {
    config.headers.reqDate = +new Date();
    config.headers.version = '0.0.1';
    return config;

}, (error) => {
    console.log(error);
    Promise.reject(error);
});


service.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    console.log(error);
    Promise.reject(error);
});

export default service;
