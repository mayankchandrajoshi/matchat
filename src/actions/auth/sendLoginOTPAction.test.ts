import { describe, Mock, vi } from 'vitest';
import sendLoginOTPAction from './sendLoginOTPAction';

import { SignupFormSchema } from '@/lib/schemas/forms/signupFormSchema';
import sendOTPMessage from '@/utils/server/sendOTPMessage';

const USER_EMAIL = "test@example.com"
const LOGIN_OTP = "123456"

vi.mock('@/lib/schemas/forms/signupFormSchema', () => ({
    SignupFormSchema: {
        safeParse: vi.fn(),
    },
}));

vi.mock('@/utils/server/sendOTPMessage', () => ({
    default: vi.fn(),
}));

describe('sendLoginOTP', () => {
    it('returns validation errors when email is empty', async () => {
        (SignupFormSchema.safeParse as Mock).mockReturnValueOnce({
            success:false,
            error: {
                flatten: () => ({
                    fieldErrors: { email: ['Email is required'] },
                }),
            },
        });

        const formData = new FormData();
        formData.set('email', ''); 

        const result = await sendLoginOTPAction({}, formData);

        expect(result).toEqual({
            success:false,
            errors: 'Email is required'
        });

        expect(SignupFormSchema.safeParse).toHaveBeenCalledWith({
            email: '',
        });
    });

    it('returns validation errors when input is invalid', async () => {
        (SignupFormSchema.safeParse as Mock).mockReturnValueOnce({
            success:false,
            error: {
                flatten: () => ({
                    fieldErrors: { email: ['Invalid email address'] },
                }),
            },
        });

        const formData = new FormData();
        formData.set('email', 'randomEmail'); 

        const result = await sendLoginOTPAction({}, formData);

        expect(result).toEqual({
            success:false,
            errors: 'Invalid email address',
        });
    });

    it('sends OTP successfully with valid input', async () => {
        (SignupFormSchema.safeParse as Mock).mockReturnValue({
            success:true,
            data: { email: USER_EMAIL },
        });

        const formData = new FormData();
        formData.set('email', USER_EMAIL);

        const result = await sendLoginOTPAction({}, formData);

        expect(sendOTPMessage).toHaveBeenCalled();
        
        expect(result.success).toBe(true);
        expect(result.message).toBe(`OTP Sent Successfully to ${USER_EMAIL}`);
    });
});