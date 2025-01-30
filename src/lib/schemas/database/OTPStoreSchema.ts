import z from 'zod'

export const OTPStoreSchema = z.object({
    email: z.string(),
    otp: z.string(),
    totalRequests: z.number(),
})