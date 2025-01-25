"use client"

import React, { ChangeEvent, FormEvent, useActionState, useEffect, useState } from 'react'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import sendLoginOTPAction from '@/actions/auth/sendLoginOTPAction'
import Loader1 from '../../loaders/Loader1'

const LoginForm = () => {
    const router = useRouter();
    const { toast } = useToast()

    const [ email, setEmail ] = useState<string>("");

    const [state, sendOTP, isSendingOTP] = useActionState(sendLoginOTPAction, undefined)  

    useEffect(()=>{
        if(state?.errors){
            toast({
                variant: "destructive",
                description: state.errors.email
            })
            return;
        }
        else if(state?.success){
            localStorage.setItem("user-email", email);
            toast({
                variant: "default",
                description: state.message
            }) 
            router.push("/auth/login/verify/otp");
        }
    },[state])

    return (
        <form action={sendOTP} className='mt-10 flex flex-col gap-5'>
            <Input 
                name='email'
                type="text"
                placeholder="Email" 
                required
                value={email}
                onChange={(e:ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)}
                className={`text-white text-lg placeholder:text-lg p-4 border-2 border-neutral-500 focus-visible:border-green-600 hover:border-green-600 focus-visible:ring-0 rounded-lg h-14 [&:not(:placeholder-shown)]:text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none focus:outline-none`}
            />
            <Button disabled={isSendingOTP} type='submit' className={`h-10 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-sm transition-all duration-300 ease-in-out uppercase text-lg`}>
                {
                    !isSendingOTP? <span>Send OTP</span> : (
                        <Loader1 />
                    )
                }
            </Button>
        </form>
    )
}

export default LoginForm