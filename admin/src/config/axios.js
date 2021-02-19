import axios from 'axios';
import { getInfo, setInfo } from '@/utils/auth';

const service = axios.create({
    baseURL: '/api/',
    timeout: 30000,
    withCredentials: true,
    headers: { 'Content-Type': 'text/plain', charset: 'UTF-8' },
});

service.interceptors.request.use((config) => {
    config.headers['xsource'] = 'admin_system'
    config.headers.reqDate = +new Date();
    config.headers.version = '0.0.1';
    const info = getInfo() || '{}';
    const infoObj = JSON.parse(info);
    config.headers.token = infoObj.token || '';
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
