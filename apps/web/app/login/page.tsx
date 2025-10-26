import { Card } from "@repo/ui/components/ui/card";
import { LoginForm } from "app/components/authForm";

export default function Login() {
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
        <Card className="flex bg-blur-lg backdrop-filter bg-slate-100/5 rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
            <img className="hidden lg:block lg:w-1/2 bg-cover" src="/freepik-export-20240912195347CVwk.jpeg" alt="login-pics" />
            <LoginForm/>
        </Card>  
    </div>
  )
}
