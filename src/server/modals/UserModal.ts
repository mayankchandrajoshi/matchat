import mongoose from "mongoose";
import validator from 'validator';

const userSchema = new mongoose.Schema({
    email: { 
        type: String,
        unique:true,
        index: true,
        required: true,
        trim: true ,
        validate: [validator.isEmail, 'Invalid email address']
    },
    username: { type: String,index: true, required: true, trim: true },
    image: { type: String },
    about: { type: String, trim: true,maxlength:200 },
    status: { type: String, enum: ['online', 'offline'], default: 'offline' },
    lastActive: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

const UserModal = mongoose.models.UserModal || mongoose.model("UserModal", userSchema);

export default UserModal;