import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: { type: String,unique:true,index:true, required: true, trim: true },
    otp: { type: String, required: true },
    totalRequests: { type: Number, default: 5,max: 5,min: 0 },
});  

const OTPStore = mongoose.models.OTPStore || mongoose.model("OTPStore", otpSchema);

export default OTPStore;