import { LoginContext } from '../Contexts/LoginContext';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useContext } from 'react';

export const backend_url = import.meta.env.VITE_BACKEND_URL;

export const useNetWorkCalls = () => {
    const {logout} = useContext(LoginContext)
    
    const netWorkCalls=async({ method, path, data = null,isForForm=false,ignoreCookie=false})=>{
        const urlToCall = `${backend_url}${path}`;
        method=method.toUpperCase()
        console.log('in the network calls');
        
        const token = Cookies.get('token');

        console.log("token", token);
        let response;
        if ((token!=undefined) || ignoreCookie==true){
            
            try{
                if (ignoreCookie==false){
                    const decodedToken=jwtDecode(token,{verify:false});
                    const currentTime = Math.floor(Date.now() / 1000);
                    console.log(currentTime)
                    console.log(decodedToken,);
                    


                    if (decodedToken.exp < currentTime){
                        console.log("token expired");
                        console.log('token expired, please login');
                        await logout()
                        return;
                    }
                }

                var config = {
                    headers: {
                        "Authorization":`Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                    
                };

                if (isForForm==true){
                    config={
                        headers: {
                            "Authorization":`Bearer ${token}`,
                            "Content-Type": "multipart/form-data",
                        }
                    }
                }
                console.log('before url to call : ',config,urlToCall,data);
                
                if (method === "POST") {
                    response = await axios.post(urlToCall,data,config);
                } else if (method === "GET") {
                    response = await axios.get(urlToCall,config);
                } else if (method === "PUT") {
                    response = await axios.put(urlToCall,data,config);
                } else if (method === "DELETE") {
                    response = await axios.delete(urlToCall,config);
                } else {
                    throw new Error("Unsupported HTTP method");
                }
                console.log('data from network : ',response.data);
                
                if (response.status==200){
                    return response.data;
                }
                else{
                    console.error("error from NetworkCalls:",response.data,'status code : ',response.status);
                    return;
                }

            } catch (error) {
                const response=error.response
                console.log(response.status,response.data.detail.logout);
                
                if (response && response.status==401 && response.data.detail.logout){
                    await logout()
                }
                console.log("error from NetworkCalls (catch):",error);
                return 
            }
        }
        else{
            console.log("There is no token please login");
            return;
        }
    }

    return { netWorkCalls }

};

