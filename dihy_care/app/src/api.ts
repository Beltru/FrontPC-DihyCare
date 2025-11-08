//cliente publico Axios 
import axios from 'axios';
import { AxiosInterceptor } from './interceptors/axios.interceptor'; 
 const  BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://dihycare-backend.vercel.app";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

//insertar interceptor 
AxiosInterceptor(api)


export default api;
