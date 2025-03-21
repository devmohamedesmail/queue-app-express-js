import connectDB from "../config/db.js";
import Setting from "../models/Setting.js";

export const fetch_setting = async (req, res) => {
    try {
        await connectDB();
       const setting =  await Setting.findOne();
        res.json({ 
            status: 200,
            data: setting,
            message: 'Setting fetched successfully'
         });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}