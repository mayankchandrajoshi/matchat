import { z } from "zod";

export const OTPValidationSchema = z.object({
    otp: z
        .string()
        .min(6, 'OTP must be 6 digits long')  
        .max(6, 'OTP must be 6 digits long')  
        .regex(/^\d+$/, 'OTP must be numeric'), 
});

export type OTPFormState = {
    errors?: {
        otp?: string[],
    }
    message?: string
} | undefined