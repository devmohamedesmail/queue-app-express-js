import mongoose from "mongoose";


const PlaceSchema = new mongoose.Schema({
    nameEn: {
        type: String,
        required: true,
    },
    nameAr: {
        type: String,
        required: true,
    },
    addressEn: {
        type: String,
        required: true,
    },
    addressAr: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    
    location: {
        lat: { 
            type: String, 
            required: true 
        },
        lng: { 
            type: String, 
            required: true 
        },
    },


}, { timestamps: true });

export default mongoose.model('Place', PlaceSchema);
