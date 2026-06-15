import React, { createContext, useContext, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { backend_url } from '../Utils/NetworkCalls'


export const LoginContext=createContext()

export const LoginContextProvider = (props) => {
    const [isLoggedIn,setIsLoggedIn]=useState(false)
    const navigateTo=useNavigate()

    const sendOtp = async (email) => {
        try {
            const res = await axios.post(`${backend_url}/auth/otp/send`, { email });
            return res.status === 200;
        } catch (e) {
            console.error("Error sending OTP: ", e);
            return false;
        }
    }

    const verifyOtp = async (email, otp) => {
        try {
            const res = await axios.post(`${backend_url}/auth/admin/otp/verify`, { email, otp });
            if (res.status === 200) {
                const data = res.data;
                // Admin frontend expects "token"
                Cookies.set("token", data.access_token);
                Cookies.set('user_name', data.user_name);
                Cookies.set('user_profile', data.profile_picture);
                Cookies.set('role', data.role);
                setIsLoggedIn(true);
                return { success: true };
            }
            return { success: false, error: "Invalid response" };
        } catch (e) {
            console.error("Error verifying OTP: ", e);
            const errorMsg = e.response?.data?.detail || "Invalid or expired OTP.";
            return { success: false, error: errorMsg };
        }
    }

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

    const values={login,logout,getLoginCredentials,checkIsUserLoggedIn,isLoggedIn,setIsLoggedIn, sendOtp, verifyOtp}

    return (
        <LoginContext.Provider value={values}>
            {props.children}
        </LoginContext.Provider>
    )
}
