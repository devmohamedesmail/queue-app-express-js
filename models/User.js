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
    address: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: false,
        default: 'user'
    },
    place: {
        type: String,
        required: false,
        default: "0"
    },
    serviceId: {
        type: String,
        required: false,
        default: "0"
    },
    service: {
        type: Object,
        required: false,
        default: {}
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









}, {
    timestamps: true
});

export default mongoose.model('User', UserSchema)