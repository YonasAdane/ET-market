import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CreateUser } from "app/lib/auth/action"
import Link from "next/link"
import GoogleButton from "./googleButton"

export default function RegisterForm() {
   
  
   
    return (
        <form action={ async (data)=>{await CreateUser(data)}}
            className="w-full px-8 py-2 lg:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">ET-market</h2>
            <p className="text-xl text-gray-600 text-center">Register!</p>
            {/* {errors && <div className="block text-red-500 text-sm font-bold mb-2">{err}</div>} */}
            <GoogleButton/>
            <div className="mt-2 flex items-center justify-between">
                <span className="border-b w-1/5 lg:w-1/4"></span>
                <a href="#" className="text-xs text-center text-gray-500 uppercase">or register with email</a>
                <span className="border-b w-1/5 lg:w-1/4"></span>
            </div>
            <div className="mt-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                <input 
                name="firstName" 
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-1 px-4 block w-full appearance-none"
                 type="text"/>
            </div>
            <div className="mt-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                <input 
                name="lastName"
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-1 px-4 block w-full appearance-none"
                 type="text"/>
            </div>
            <div className="mt-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                <input 
                name="email"
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-1 px-4 block w-full appearance-none"
                 type="text"/>

            </div>
            <div className="mt-2">
                <div className="flex justify-between">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <a href="#" className="text-xs text-gray-500">Forget Password?</a>
                </div>

                <Input 
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-1 px-4 block w-full appearance-none" 
                type="password"/>

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
