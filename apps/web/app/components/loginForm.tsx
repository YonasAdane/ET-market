"use client";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import GoogleButton from "./googleButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, loginSchemaType } from "app/lib/consts";
import { Login } from "../lib/auth/action";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function LoginForm() {
    const [err,setErr]=useState("");
    const router=useRouter();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<loginSchemaType>({resolver:zodResolver(loginSchema)})
    async function LoginLocal(data:loginSchemaType){
        
        const auth=await Login(data);
        console.log(auth);
        
        if(auth){
            router.push("/")
        }else{
        setErr("authentication failed");
        }

    }
  
   
    return (
        <form onSubmit={handleSubmit(LoginLocal)}
            className="w-full p-8 lg:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">ET-market</h2>
            <p className="text-xl text-gray-600 text-center">Welcome back!</p>
            {err && <div className="block text-red-500 text-sm font-bold mb-2">{err}</div>}
            <GoogleButton/>
            <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-1/5 lg:w-1/4"></span>
                <a href="#" className="text-xs text-center text-gray-500 uppercase">or login with email</a>
                <span className="border-b w-1/5 lg:w-1/4"></span>
            </div>
            <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                <input 
                {...register("email")} 
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                 type="text"/>
                {errors.email && <div className="block text-red-500 text-sm font-bold mb-2">{errors.email.message}</div>}

            </div>
            <div className="mt-4">
                <div className="flex justify-between">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <a href="#" className="text-xs text-gray-500">Forget Password?</a>
                </div>

                <Input 
                {...register("password")}
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" 
                type="password"/>
                {errors.password && <div className="block text-red-500 text-sm font-bold mb-2">{errors.password.message}</div>}

            </div>
            <div className="mt-8">
                <Button type="submit" className="  py-2 px-4 w-full font-bold">Login</Button>
            </div>
            <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-1/5 md:w-1/4"></span>
                <a href="#" className="text-xs text-gray-500 uppercase">or sign up</a>
                <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
        </form>
    )
}
