'use server'

import { SignupFormSchema, FormState } from '@/lib/schemas/forms/signupFormSchema'

export async function sendLoginOTP(state: FormState, formData: FormData) {
    const validatedFields = SignupFormSchema.safeParse({
        email: formData.get('email'),
    })
    
    if (!validatedFields.success) {
        return {
            success:false,
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { email } = validatedFields.data

    const otp = Math.random().toString().slice(2, 8).toString();
    
    const expires = Date.now() + 5 * 60 * 1000; // valid for 5 minutes


    return {
        success:true,
        message: `OTP Sent Successfully to ${email}`,
    }
}