"use server"

import { OTPFormState, OTPValidationSchema } from '@/lib/schemas/forms/signUpOTPValidationSchema'
import * as OTPAuth from "otpauth";
import { LOGIN_OTP } from '../../../constants/test/auth';
import OTPStoreModal from '@/server/modals/OTPStoreModal';
import { redirect } from 'next/navigation';
import UserModal from '@/server/modals/UserModal';
import { createSession } from '@/lib/session';

export default async function verifyOTP(state: OTPFormState, formData: FormData,userEmail:string|null) {

    if(!userEmail){
        return {
            success:false,
            errors: "User email not found",
        }
    }

    const validatedFields = OTPValidationSchema.safeParse({
        otp: formData.get('otp'),
    })
    
    if (!validatedFields.success) {
        return {
            success:false,
            errors: validatedFields.error.flatten().fieldErrors.otp?.[0],
        }
    }

    const totp = new OTPAuth.TOTP({
        issuer: "MatChat",
        algorithm: "SHA1",
        digits: 6,
        period: 60,
        secret: process.env.OTP_SECRET_KEY!,
    });

    if(process.env.BACkEND_ENV!="testing") {
        const storedOTPData = await OTPStoreModal.findOne({email:userEmail});

        if(!storedOTPData) {
            redirect("/auth/login/");
        }

        if(storedOTPData?.totalRequests==0){
            return {
                success:false,
                errors: "OTP limit exceeded.",
            }
        }

        await OTPStoreModal.updateOne({email:userEmail},{$inc:{totalRequests:-1}});
    }

    const isValidOTP = process.env.BACKEND_ENV=="testing"? (
        validatedFields.data.otp==LOGIN_OTP
    ):(
        totp.validate({token:validatedFields.data.otp})!=null
    )

    if(!isValidOTP) {
        return {
            success:false,
            errors: "Invalid OTP",
        }    
    }
    
    if(process.env.BACkEND_ENV!="testing") {
        
        let user = await UserModal.findOne({email:userEmail});

        if(!user){
            user = await UserModal.create({email:userEmail,username:userEmail});
        }

        await createSession(user._id);
    }

    return {
        success:true,
        message: "Logged in successfully",
    }
}