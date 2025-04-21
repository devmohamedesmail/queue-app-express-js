import mongoose from "mongoose";
const HelpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    message: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: false,
        default: Date.now,
    }
}, { timestamps: true });


export default mongoose.model("Help", HelpSchema);  
