import connectDB from "../../config/db.js";
import Setting from "../../models/Setting.js";

export const update_setting = async (req, res) => {
    try {
       
    
        await connectDB();
    
        const setting = await Setting.findOne();
        if (setting) {
            // if record is found, update the record
            setting.nameEn = req.body.nameEn;
            setting.nameAr = req.body.nameAr;
            setting.descriptionEn = req.body.descriptionEn;
            setting.descriptionAr = req.body.descriptionAr;
           
            if(req.file){
                setting.logo = req.file.filename;
            }
            setting.email = req.body.email;
            setting.phone = req.body.phone;
            setting.address = req.body.address;
            setting.appUrl = req.body.appUrl;
            await setting.save();
            res.redirect('/dashboard/setting');
        } else {
            // if record is not found, create a new record
            const setting = new Setting();
            setting.nameEn = req.body.nameEn;
            setting.nameAr = req.body.nameAr;
            setting.descriptionEn = req.body.descriptionEn;
            setting.descriptionAr = req.body.descriptionAr;
            setting.logo = req.file.filename;
            setting.email = req.body.email;
            setting.phone = req.body.phone;
            setting.address = req.body.address;
            setting.appUrl = req.body.appUrl;
            await setting.save();
            res.redirect('/dashboard/setting');
        }
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}