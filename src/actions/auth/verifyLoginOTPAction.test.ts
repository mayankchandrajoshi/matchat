import verifyLoginOTPAction from "./verifyLoginOTPAction";

const LOGIN_OTP = "123456";

describe('verifyOTP', () => {
    it('returns validation errors when OTP is empty', async () => {
        const formData = new FormData();
        formData.set('otp', ''); 

        const result = await verifyLoginOTPAction({}, formData);

        // expect(result).toEqual({
        //     success:false,
        //     errors: "OTP must be 6 digits long",
        // });
    });

    it('verifies OTP successfully with valid input', async () => {
        const formData = new FormData();
        formData.set('otp', LOGIN_OTP); 

        const result = await verifyLoginOTPAction({}, formData);

        expect(result).toEqual({
            success:true,
            message: "Logged in successfully",
        });
    });
});
