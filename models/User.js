import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: false,
        default:'user'
    },
    place:{
        type: String,
        required: false,
        default:null
    },
    image: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    },
    emailVerified: {
        type: Boolean,
        required: false
    },
    phoneVerified: {
        type: Boolean,
        required: false
    },
    emailVerificationCode: {
        type: String,
        required: false
    },
    phoneVerificationCode: {
        type: String,
        required: false
    },
    emailVerificationCodeExpires: {
        type: Date,
        required: false
    },
    phoneVerificationCodeExpires: {
        type: Date,
        required: false
    },
    passwordResetCode: {
        type: String,
        required: false
    },
    passwordResetCodeExpires: {
        type: Date,
        required: false
    },
    notificationToken: {
        type: String,
        required: false
    },
    
}, {
    timestamps: true
});

export default mongoose.model('User', UserSchema)