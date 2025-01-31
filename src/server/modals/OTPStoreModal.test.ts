import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import OTPStore from "./OTPStoreModal";
import { mockUserEmail } from "../../../constants/test/auth";

describe("OTPStore Model", () => {
    let mongoServer: MongoMemoryServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
        await OTPStore.syncIndexes();
    });

    afterEach(async () => {
        await OTPStore.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongoServer.stop();
    });

    it("should create and save an OTP document successfully", async () => {
        const otpData = { email: mockUserEmail, otp: "123456" };
        const otp = new OTPStore(otpData);
        const savedOtp = await otp.save();

        expect(savedOtp.email).toBe(otpData.email);
        expect(savedOtp.otp).toBe(otpData.otp);
        expect(savedOtp.totalRequests).toBe(5);
    });

    it("should enforce unique email constraint", async () => {
        const otp1 = new OTPStore({ email: mockUserEmail, otp: "111111" });
        const otp2 = new OTPStore({ email: mockUserEmail, otp: "222222" });

        await otp1.save();
        await expect(otp2.save()).rejects.toThrow(`E11000 duplicate key error collection: test.otpstores index: email_1 dup key: { email: "${mockUserEmail}" }`);
    });

    it("should respect min constraints for totalRequests", async () => {
        const otp = new OTPStore({ email: mockUserEmail, otp: "999999", totalRequests: -1 });

        await expect(otp.save()).rejects.toThrow("OTPStore validation failed: totalRequests: Path `totalRequests` (-1) is less than minimum allowed value (0).");
    });

    it("should respect max constraints for totalRequests", async () => {
        const otp = new OTPStore({ email: mockUserEmail, otp: "999999", totalRequests: 10 });

        await expect(otp.save()).rejects.toThrow("OTPStore validation failed: totalRequests: Path `totalRequests` (10) is more than maximum allowed value (5).");
    });
});
