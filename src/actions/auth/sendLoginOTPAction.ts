'use server'

import connectDB from '@/lib/connectDB';
import { SignupFormSchema, EmailFormState } from '@/lib/schemas/forms/signupFormSchema'
import OTPStoreModal from '@/server/modals/OTPStoreModal';
import sendOTPMessage from '@/utils/server/sendOTPMessage';
import * as OTPAuth from "otpauth";

export default async function sendLoginOTP(state: EmailFormState, formData: FormData) {
    try {
        const validatedFields = SignupFormSchema.safeParse({
            email: formData.get('email'),
        })
        
        if (!validatedFields.success) {
            return {
                success:false,
                errors: validatedFields.error.flatten().fieldErrors.email?.[0],
            }
        }
    
        const { email } = validatedFields.data
    
        const totp = new OTPAuth.TOTP({
            issuer: "MatChat",
            label: email,
            algorithm: "SHA1",
            digits: 6,
            period: 60,
            secret: process.env.OTP_SECRET_KEY!,
        });
    
        const otp = totp.generate();
    
        if(process.env.BACkEND_ENV!="testing") {
            await connectDB();
            await OTPStoreModal.findOneAndUpdate({ email}, {otp, totalRequests: 5}, {upsert: true,setDefaultsOnInsert: true});
        }
        
        await sendOTPMessage(email, otp);
    
        return {
            success:true,
            message: `OTP Sent Successfully to ${email}`,
        }
    } catch (error) {
        return {
            success:false,
            errors: 'Failed to send OTP',
        }
    }
}
