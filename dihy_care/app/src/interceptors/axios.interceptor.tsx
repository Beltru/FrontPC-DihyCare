//interceptior para la llamada del backend
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

export const AxiosInterceptor = (instance: AxiosInstance) => {
  const updateHeader = (request: InternalAxiosRequestConfig) => {
    // localStorage solo está disponible en el cliente
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

    if (!request.headers) {
      request.headers = {} as any;
    }

    if (token) {
      (request.headers as any)['Authorization'] = `Bearer ${token}`;
    }

    (request.headers as any)['Content-Type'] = 'application/json';

    return request;
  };

  instance.interceptors.request.use(
    updateHeader,
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => {
      console.log('Respuesta interceptada', response);
      return response;
    },
    (error) => {
      console.error('Error interceptado', error);
      return Promise.reject(error);
    }
  );
};