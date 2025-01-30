"use client"

import React, { ChangeEvent, useActionState, useEffect, useState } from 'react'
import { Button } from '../../ui/button'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"  
import verifyLoginOTPAction from '@/actions/auth/verifyLoginOTPAction'
import Loader1 from '@/components/loaders/Loader1'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { OTPFormState } from '@/lib/schemas/forms/signUpOTPValidationSchema'


const OTPSubmitForm = () => {

    const { toast } = useToast();
    const router = useRouter();

    const [ state,action,isVerifyingOTP ] = useActionState((state:OTPFormState,formData:FormData)=>verifyLoginOTPAction(state,formData,localStorage.getItem("user-email")),undefined);

    useEffect(() => { 
        if(state?.errors){
            toast({
                variant: "destructive",
                description: state.errors,
            });
            return;
        }
        else if(state?.success){
            toast({
                variant: "default",
                description: state.message,
            });
            router.replace("/chats");
        }
    }, [state]);

    return (
        <form action={action} className='mt-10 flex flex-col items-center gap-5'>
            <InputOTP data-testid='input-otp' name='otp' maxLength={6} inputMode='numeric' pattern="^\d+$">
                <InputOTPGroup>
                    <InputOTPSlot index={0} className="w-12 h-12 text-xl" />
                    <InputOTPSlot index={1} className="w-12 h-12 text-xl" />
                    <InputOTPSlot index={2} className="w-12 h-12 text-xl" />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={3} className="w-12 h-12 text-xl" />
                    <InputOTPSlot index={4} className="w-12 h-12 text-xl" />
                    <InputOTPSlot index={5} className="w-12 h-12 text-xl" />
                </InputOTPGroup>
            </InputOTP>
            <Button type='submit' disabled={isVerifyingOTP} className={`w-full bg-green-500 hover:bg-green-600 text-white font-semibold p-5 rounded-sm transition-all duration-300 ease-in-out uppercase text-lg`}>
                { !isVerifyingOTP ? 'Login' : <Loader1/> }
            </Button>
        </form>
    )
}

export default OTPSubmitForm
