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
    placeId: {
        type: String,
        required: false,
        default: null
    },
    serviceId: {
        type: String,
        required: false,
        default:  null
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
    
  

}, {
    timestamps: true
});

export default mongoose.model('User', UserSchema)