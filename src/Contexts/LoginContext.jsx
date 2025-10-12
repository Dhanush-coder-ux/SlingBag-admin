import React, { createContext, useContext, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export const LoginContext=createContext()
const backend_url = import.meta.env.VITE_BACKEND_URL;

export const LoginContextProvider = (props) => {
    const [isLoggedIn,setIsLoggedIn]=useState(false)
    const navigateTo=useNavigate()

    const login=async()=>{
        console.log("on login");
        
        try{
            const res=await axios.get(`${backend_url}/auth/user`)
            if (res){
                window.location.href=res.data.login_url
            }
            else return false
        }
        catch (e){
            console.error("Error Login : ",e);
            return false
        }
    }

    const logout=async()=>{
        console.log("on logout");
        
        Cookies.remove('token');
        Cookies.remove('user_name');
        Cookies.remove('user_profile');
        Cookies.remove('role')
        setIsLoggedIn(false)
    }

    const getLoginCredentials=async({user_token,user_name,user_profile})=>{
        try{
            const res=await axios.get(`${backend_url}/auth/token/both?token=${user_token}`);
            console.log("Credentials : ",res)
            if (res.status==200){
                Cookies.set("token",res.data.token);
                Cookies.set('user_name',user_name)
                Cookies.set('user_profile',user_profile)
                Cookies.set('role',res.data.role)
                setIsLoggedIn(true)
                
            }
            else{
                console.warn("Something went wrong please sigin in again ! ");
            }

        }
        catch (e){
            console.error("Something went wrong please sigin in again ! ",e);
        }finally{
            navigateTo('/add',{'replace':true})
            console.log("finally block");
            
        }
    }

    const checkIsUserLoggedIn=async()=>{
            if (
                Cookies.get("token") &&
                Cookies.get('user_name')
            ){

                setIsLoggedIn(true)
            }
            else{
                await logout()
            }
    }

    const values={login,logout,getLoginCredentials,checkIsUserLoggedIn,isLoggedIn,setIsLoggedIn}

    return (
        <LoginContext.Provider value={values}>
            {props.children}
        </LoginContext.Provider>
    )
}
