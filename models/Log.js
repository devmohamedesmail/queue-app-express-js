import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({
    
    user:{
        type: mongoose.Schema.Types.Mixed,
        required: false,
        default: null,
    },
    message: {
        type: String,
        required: false,
        default: null,
    },
    date: {
        type: Date,
        required: false,
        default: Date.now,
    }
}, { timestamps: true });


const Log = mongoose.model("Log", LogSchema);
export default Log;

