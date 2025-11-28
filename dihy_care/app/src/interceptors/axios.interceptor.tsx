//interceptior para la llamada del backend
import {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError, 
} from 'axios'; 

export const AxiosInterceptor = (instance: AxiosInstance) => {

  // Lógica del Interceptor de Solicitud (Request) - (SIN CAMBIOS)
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
      console.log('Respuesta interceptada exitosa', response);
      return response;
    },
    (error: AxiosError) => {
      const Dihy_Care = '[API INTERCEPTOR]';

      if (error.response) {
        const status = error.response.status;
        const message = error.response.data || 'Error desconocido';

      
        if (status === 401) {
          console.error(
            `${Dihy_Care} ERROR 401: Sesión expirada o token inválido. Mensaje:`, 
            message
          );
        
        }

        else if (status === 403) {
          console.error(
            `${Dihy_Care} ERROR 403: Acceso denegado. Mensaje:`, 
            message
          );
        }
        
        // manejo errores de server 500+
      
        else if (status >= 500) {
          console.error(
            `${Dihy_Care} ERROR ${status}: Error interno del servidor. Mensaje:`, 
            message
          );
        }
        
        // no manejados 
        else {
            console.warn(
                `${Dihy_Care} ERROR ${status}: Error HTTP no manejado. Mensaje:`, 
                message
            );
        }

      } else {
          // 
          console.error(`${Dihy_Care} ERROR DE RED:`, error.message);
      }
      
      return Promise.reject(error);
    }
  );
};