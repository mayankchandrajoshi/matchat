
import { OTPFormState, OTPValidationSchema } from '@/lib/schemas/forms/signUpOTPValidationSchema'

export default async function verifyOTP(state: OTPFormState, formData: FormData) {

    const validatedFields = OTPValidationSchema.safeParse({
        otp: formData.get('otp'),
    })
    
    if (!validatedFields.success) {
        return {
            success:false,
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    return {
        success:true,
        message: "Logged in successfully",
    }
}