import { OTPValidationSchema } from "./signUpOTPValidationSchema";

describe("SignUpOTPValidationSchema", () => {
    it("validates a correct OTP", () => {
        const result = OTPValidationSchema.safeParse({ otp: "123456" });
        expect(result.success).toBe(true);
    });

    it("rejects an invalid OTP", () => {
        const result = OTPValidationSchema.safeParse({ otp: "1234" });
        expect(result.success).toBe(false);
        expect(result.error?.issues[0]?.message).toBe("OTP must be 6 digits long");
    });
});