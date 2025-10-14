//interceptior para la llamada del backend
import axios ,{ AxiosRequestConfig } from 'axios';

export const AxiosInterceptor = () => {
    const updateHeader = (request: AxiosRequestConfig) =>{
        const token = '1232312312313112';//insert token del back; 
        const newHeaders = {
        authorization: token,
        "Content-Type":"application/json", 

    }; 
        request.headers = newHeaders;   
        return request;
    }

    axios.interceptors.request.use((request)=>{

        return updateHeader(request);

    }); 

    axios.interceptors.response.use(
        
        (response)=>{
            
        console.log('interceptor de respuesta', response);
        return response;

        },
        
        (error)=>{}

    );

}