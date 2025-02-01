"use server";

import { compare } from "bcryptjs";
// import { loginSchemaType, registerSchemaType } from "../consts";
 
// export async function Login(data:loginSchemaType){
//   try {
//     const res=await fetch(`${process.env.BACKEND_URL}/api/v1/auth/login`,{
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(data),
//           credentials:"include"
//         });
//         console.log("reas",res.status);
        
//         return res.status===200 ? true:false;
//   } catch (error) {
//     return false;   
//   }  
// }
// export async function Register(data:registerSchemaType){
//   try {
//     const res=await fetch(`${process.env.BACKEND_URL}/api/v1/auth/register`,{
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(data),
//           credentials:"include"
//         });
//         console.log("reas",res.status);
        
//         return res.status===200 ? true:false;
//   } catch (error) {
//     return false;   
//   }  
// }

import { redirect } from "next/navigation";
import { signIn } from "../auth";
import { db } from "../config/prisma-config";
import { registerSchemaType } from "../consts";
import { saltAndHashPassword } from "../utils";

// Function to retrieve user from database
export async function getUserFromDb(email: string, pwHash: string) {
  const user = await db.user.findUnique({
    where: { email },
  })

  if (user?.password && (await compare(pwHash, user.password))) {
    return user
  }

  return null
}
export async function CreateUser(data:registerSchemaType){
  let user=null;
  try {
    const hashed=await saltAndHashPassword(data.password)
    user=await db.user.create({data:{...data,password:hashed}});
    return redirect("/login")
  } catch (error) {
    return {
      error:"something went wrong"
    }
  }

}
export async function CredentialLogin(data:{email:string,password:string}){
  try {
   await signIn("credentials",{email:data.email,password:data.password,redirectTo:"/"})
  } catch (error) {
    console.error("erorr from login: ",error);
    
    return{
      error:"Error login"
    }
  }
}