import { z } from 'zod'

export const SignupFormSchema = z.object({
    email: z
        .string()
        .trim()
        .regex(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Invalid email address'
        )
})

export type EmailFormState = {
    errors?: {
        email?: string[],
    }
    message?: string
} | undefined