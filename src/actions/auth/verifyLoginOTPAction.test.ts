
import { vi } from "vitest";
import { LOGIN_EMAIL, LOGIN_OTP } from "../../../constants/test/auth";
import verifyLoginOTPAction from "./verifyLoginOTPAction";


vi.mock('@/lib/session', () => ({
    createSession: vi.fn(),
    verifySession: vi.fn(),
    deleteSession: vi.fn(),
    encrypt: vi.fn(),
    decrypt: vi.fn(),
}))

describe('verifyOTP', () => {
    it('return validation errors when email is null', async () => {
        const formData = new FormData();
        formData.set('otp', LOGIN_OTP); 

        const result = await verifyLoginOTPAction({}, formData,null);

        expect(result).toEqual({
            success:false,
            errors: "User email not found",
        });
    })
    it('returns validation errors when OTP is empty', async () => {
        const formData = new FormData();
        formData.set('otp', ''); 

        const result = await verifyLoginOTPAction({}, formData,LOGIN_EMAIL);

        expect(result).toEqual({
            success:false,
            errors: "OTP must be 6 digits long",
        });
    });

    it('returns errors when OTP is invalid', async () => {
        const formData = new FormData();
        formData.set('otp', '125445');
        
        const result = await verifyLoginOTPAction({}, formData,LOGIN_EMAIL);

        expect(result).toEqual({
            success:false,
            errors: "Invalid OTP",
        });
    })

    it('verifies OTP successfully with valid input', async () => {
        const formData = new FormData();
        formData.set('otp', LOGIN_OTP); 

        const result = await verifyLoginOTPAction({}, formData,LOGIN_EMAIL);

        expect(result).toEqual({
            success:true,
            message: "Logged in successfully",
        });
    });
});
