import mongoose from "mongoose";
const AppSettingSchema = new mongoose.Schema({

    lighttheme: {
        primary: {
            type: String,
            default: "#3498db",
        },
        secondary: {
            type: String,
            default: "#2ecc71",
        },
        background: {
            type: String,
            default: "#ffffff",
        },
        text: {
            type: String,
            default: "#333333",
        },
    },
    darktheme: {
        primary: {
            type: String,
            default: "#1abc9c",
        },
        secondary: {
            type: String,
            default: "#f39c12",
        },
        background: {
            type: String,
            default: "#2c3e50",
        },
        text: {
            type: String,
            default: "#ecf0f1",
        },
    }

})


const AppSetting = mongoose.models.AppSetting || mongoose.model('AppSetting', AppSettingSchema);

export default AppSetting;