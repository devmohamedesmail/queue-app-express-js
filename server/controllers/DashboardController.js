
import connectDB from "../config/db.js";
import Place from "../models/Place.js";
import Setting from "../models/Setting.js";








// ********************************* Dashboard Index *********************************
export const dashboard_index = async (req, res) => {
    try {
        await connectDB()
        const places = await Place.find();
        res.render('admin/index', { places });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }

}


// ********************************* users Page *********************************
export const dashboard_users = (req, res) => {
    try {
        res.render('admin/users');
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}


// ********************************* Setting Page *********************************
export const dashboard_setting = async (req, res) => {
    try {
        await connectDB()
        const setting = await Setting.findOne();
        if (setting) {
            res.render('admin/setting', { setting });
        }
        else {
            res.render('admin/setting');
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}