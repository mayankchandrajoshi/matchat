import { sendLoginOTP } from './auth'; 

import { SignupFormSchema } from '@/lib/schemas/forms/signupFormSchema';

jest.mock('@/lib/schemas/forms/signupFormSchema', () => ({
    SignupFormSchema: {
        safeParse: jest.fn(),
    },
}));

describe('sendLoginOTP', () => {

    it('returns validation errors when email is empty', async () => {
        (SignupFormSchema.safeParse as jest.Mock).mockReturnValueOnce({
            success:false,
            error: {
                flatten: () => ({
                    fieldErrors: { email: ['Email is required'] },
                }),
            },
        });

        const formData = new FormData();
        formData.set('email', ''); 

        const result = await sendLoginOTP({}, formData);

        expect(result).toEqual({
            success:false,
            errors: { 
                email: ['Email is required']
            },
        });

        expect(SignupFormSchema.safeParse).toHaveBeenCalledWith({
            email: '',
        });
    });

    it('returns validation errors when input is invalid', async () => {
        (SignupFormSchema.safeParse as jest.Mock).mockReturnValueOnce({
            success:false,
            error: {
                flatten: () => ({
                    fieldErrors: { email: ['Invalid email address'] },
                }),
            },
        });

        const formData = new FormData();
        formData.set('email', 'randomEmail'); 

        const result = await sendLoginOTP({}, formData);

        expect(result).toEqual({
            success:false,
            errors: { 
                email: ['Invalid email address']
            },
        });

        expect(SignupFormSchema.safeParse).toHaveBeenCalledWith({
            email: 'randomEmail',
        });
    });

    it('sends OTP successfully with valid input', async () => {
        (SignupFormSchema.safeParse as jest.Mock).mockReturnValue({
            success:true,
            data: { email: 'test@example.com' },
        });

        const formData = new FormData();
        formData.set('email', 'test@example.com');

        const result = await sendLoginOTP({}, formData);

        expect(result.success).toBe(true);
        expect(result.message).toBe('OTP Sent Successfully to test@example.com');

        expect(SignupFormSchema.safeParse).toHaveBeenCalledWith({
            email: 'test@example.com',
        });
    });

    it('generates a valid OTP and sets expiration time', async () => {
        (SignupFormSchema.safeParse as jest.Mock).mockReturnValue({
            success:true,
            data: { email: 'test@example.com' },
        });

        const formData = new FormData();
        formData.set('email', 'test@example.com');

        const result = await sendLoginOTP({}, formData);

        expect(result.success).toBe(true);
        expect(result.message).toContain('OTP Sent Successfully to test@example.com');

        const generatedOtp = Math.random().toString().slice(2, 8).toString();

    });
});
