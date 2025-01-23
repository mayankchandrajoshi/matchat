"use client"

import React, { ChangeEvent, FormEvent, useActionState, useEffect, useState, useTransition } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { signup } from '@/actions/auth/auth'
import { Loader1 } from '../loaders/Loader1'
import { auth } from '@/server/firebase'
import { ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'

const LoginFormCopy = () => {
    const router = useRouter();
    const { toast } = useToast()


    const [ confirmationResult, setConfirmationResult ] = useState<ConfirmationResult | null>(null);
    const [ recaptchaVerifier, setRecaptchaVerifier ] = useState<RecaptchaVerifier | null>(null);
    const [ resendCountDown, setResendCountDown ] = useState(0);
    const [ optSendError, setOTPSendError ] = useState<string | null>(null);
    const [ isSendingOTP, startOTPTransition ] = useTransition();
    

    useEffect(()=>{
        if(optSendError){
            toast({
                variant: "destructive",
                description: optSendError
            })
            return;
        }

        // toast({
        //     description: "OTP Sent"
        // })
        // router.push("/auth/login/otp")
    },[optSendError])

    useEffect(() => {
        if (!recaptchaVerifier) {
            const verifier = new RecaptchaVerifier(
                auth,
                'recaptcha-container',
                {
                    size: 'invisible',
                }
            );
            setRecaptchaVerifier(verifier);
        }

        return () => {
            recaptchaVerifier?.clear();
        };
    }, [auth,recaptchaVerifier]);
    
    const handleSendOTP = (formData: FormData) => {
        setResendCountDown(60);

        startOTPTransition(async ()=>{
            setOTPSendError("");

            if (!recaptchaVerifier ) {
                setOTPSendError('RecaptchaVerifier is not initialized.');
                return;
            }
        
            try {
                const result = await signInWithPhoneNumber(auth, formData.get('phoneNumber') as string, recaptchaVerifier);
                console.log(result);
                
                setConfirmationResult(result);
            } catch (error) {
                setOTPSendError('Error sending OTP: ' + error);
            }
        })
    };

    return (
        <form action={handleSendOTP} className='mt-10 flex flex-col gap-5'>
            <Input 
                name='phoneNumber'
                type="tel"
                placeholder="Phone Number" 
                className={`text-white text-lg placeholder:text-lg p-4 border-2 border-neutral-500 focus-visible:border-green-600 hover:border-green-600 rounded-lg h-14 [&:not(:placeholder-shown)]:text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
            />
            <Button disabled={isSendingOTP} type='submit' className={`h-10 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-sm transition-all duration-300 ease-in-out uppercase text-lg`}>
                {
                    !isSendingOTP? <span>Send OTP</span> : (
                        <Loader1 />
                    )
                }
            </Button>
            <div id='recaptcha-container'></div>
        </form>
    )
}

export default LoginFormCopy