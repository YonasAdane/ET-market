"use server";

import { loginSchemaType, registerSchemaType } from "../consts";
 
export async function Login(data:loginSchemaType){
  try {
    const res=await fetch(`${process.env.BACKEND_URL}/api/v1/auth/login`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
          credentials:"include"
        });
        console.log("reas",res.status);
        
        return res.status===200 ? true:false;
  } catch (error) {
    return false;   
  }  
}
export async function Register(data:registerSchemaType){
  try {
    const res=await fetch(`${process.env.BACKEND_URL}/api/v1/auth/register`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
          credentials:"include"
        });
        console.log("reas",res.status);
        
        return res.status===200 ? true:false;
  } catch (error) {
    return false;   
  }  
}
