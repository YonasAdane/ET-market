"use client";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import GoogleButton from "./googleButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, loginSchemaType, registerSchema, registerSchemaType } from "app/lib/consts";
import { Login, Register } from "../lib/auth/action";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export function LoginForm() {
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
                <Link href="/register" className="text-xs text-gray-500 uppercase">or sign up</Link>
                <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
        </form>
    )
}


export default function RegisterForm() {
    const [err,setErr]=useState("");
    const router=useRouter();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<registerSchemaType>({resolver:zodResolver(registerSchema)})
    async function RegisterLocal(data:registerSchemaType){
        
        const auth=await Register(data);
        console.log(auth);
        
        if(auth){
            router.push("/")
        }else{
        setErr("Registration failed");
        }

    }
  
   
    return (
        <form onSubmit={handleSubmit(RegisterLocal)}
            className="w-full px-8 py-2 lg:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">ET-market</h2>
            <p className="text-xl text-gray-600 text-center">Register!</p>
            {err && <div className="block text-red-500 text-sm font-bold mb-2">{err}</div>}
            <GoogleButton/>
            <div className="mt-2 flex items-center justify-between">
                <span className="border-b w-1/5 lg:w-1/4"></span>
                <a href="#" className="text-xs text-center text-gray-500 uppercase">or register with email</a>
                <span className="border-b w-1/5 lg:w-1/4"></span>
            </div>
            <div className="mt-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                <input 
                {...register("firstName")} 
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-1 px-4 block w-full appearance-none"
                 type="text"/>
                {errors.firstName && <div className="block text-red-500 text-sm font-bold mb-2">{errors.firstName.message}</div>}

            </div>
            <div className="mt-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                <input 
                {...register("lastName")} 
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-1 px-4 block w-full appearance-none"
                 type="text"/>
                {errors.lastName && <div className="block text-red-500 text-sm font-bold mb-2">{errors.lastName.message}</div>}

            </div>
            <div className="mt-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">User Name</label>
                <input 
                {...register("username")} 
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-1 px-4 block w-full appearance-none"
                 type="text"/>
                {errors.username && <div className="block text-red-500 text-sm font-bold mb-2">{errors.username.message}</div>}

            </div>
            <div className="mt-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                <input 
                {...register("email")} 
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-1 px-4 block w-full appearance-none"
                 type="text"/>
                {errors.email && <div className="block text-red-500 text-sm font-bold mb-2">{errors.email.message}</div>}

            </div>
            <div className="mt-2">
                <div className="flex justify-between">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <a href="#" className="text-xs text-gray-500">Forget Password?</a>
                </div>

                <Input 
                {...register("password")}
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-1 px-4 block w-full appearance-none" 
                type="password"/>
                {errors.password && <div className="block text-red-500 text-sm font-bold mb-2">{errors.password.message}</div>}

            </div>
            <div className="mt-3">
                <Button type="submit" className="  py-2 px-4 w-full font-bold">Register</Button>
            </div>
            <div className="mt-2 flex items-center justify-between">
                <span className="border-b w-1/5 md:w-1/4"></span>
                    <Link href="/login" className="text-xs text-gray-500 uppercase">or sign in</Link>
                <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
        </form>
    )
}
