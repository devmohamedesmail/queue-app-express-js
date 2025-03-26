import connectDB from "../config/db.js"
import AppSetting from "../models/Appsetting.js"




export const update_app_setting = async (req,res) =>{
    try {
       await connectDB();
        const setting = await AppSetting.findOne();
        if(setting){
            setting.lighttheme.primary = req.body.lightPrimary;
            setting.lighttheme.secondary = req.body.lightSecondary;
            setting.lighttheme.background = req.body.lightBackground;
            setting.lighttheme.text = req.body.lightText;

            setting.darktheme.primary = req.body.darkPrimary;
            setting.darktheme.secondary = req.body.darkSecondary;
            setting.darktheme.background = req.body.darkBackground;
            setting.darktheme.text = req.body.darkText;
            await setting.save();
            
            res.render('admin/appsetting',{
                setting:setting
            })
        }else{
            const setting = new AppSetting();
            setting.lighttheme.primary = req.body.lightPrimary;
            setting.lighttheme.secondary = req.body.lightSecondary;
            setting.lighttheme.background = req.body.lightBackground;
            setting.lighttheme.text = req.body.lightText;

            setting.darktheme.primary = req.body.darkPrimary;
            setting.darktheme.secondary = req.body.darkSecondary;
            setting.darktheme.background = req.body.darkBackground;
            setting.darktheme.text = req.body.darkText;
            await setting.save();
            res.render('admin/appsetting',{
                setting:setting
            })
            
        }
    } catch (error) {
        res.send("err")
    }
}