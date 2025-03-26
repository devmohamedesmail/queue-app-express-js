
import mongoose from "mongoose";
const ServiceSchema = new mongoose.Schema({
    placeId: {
        type: String,
        ref: 'Place',
        required: true
    },
    nameAr: {
        type: String,
        required: true
    },
    nameEn: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


export default mongoose.model('Service', ServiceSchema)