//cliente publico Axios 
import axios from 'axios';
import { AxiosInterceptor } from './interceptors/axios.interceptor'; 
 const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

//insertar interceptor 
AxiosInterceptor(api)


export default api;
