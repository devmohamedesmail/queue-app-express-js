import connectDB from "../config/db.js";
import Setting from "../models/Setting.js";
import AppSetting from "../models/AppSetting.js"

export const fetch_setting = async (req, res) => {
    try {
        await connectDB();
        const setting = await Setting.findOne();
        res.json({
            status: 200,
            data: setting,
            message: 'Setting fetched successfully'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



// fetch theme settting
export const fetch_theme_setting = async (req,res) =>{
    try {
        await connectDB()
        const themesetting = await AppSetting.findOne();
        res.json({
            status: 200,
            data: themesetting,
            message: 'Setting fetched successfully'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
