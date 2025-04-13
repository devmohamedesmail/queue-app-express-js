import connectDB from "../../config/db.js";
import AppSetting from "../../models/AppSetting.js";
import Place from "../../models/Place.js";
import Setting from "../../models/Setting.js";
import User from "../../models/User.js";





// ********************************* Dashboard Index *********************************
export const dashboard_index = async (req, res) => {
    try {
        await connectDB()
        const places = await Place.find();
        const users = await User.find()
        res.render('admin/index.ejs', {
            places: places,
            users: users,
            layout: "layouts/admin",
            title: "Dashboard"
        })
    } catch (error) {
        res.render('admin/404.ejs', {
            title: "Error",
            layout: "layouts/admin",
            error: error.message
        })

    }

}


// ********************************* places Page *********************************
export const dashboard_places = async (req, res) => {
    try {
        connectDB()
        const places = await Place.find();
        res.render('admin/places/index', {
            places: places,
            layout: "layouts/admin",
            title: "Places"
        });
    } catch (error) {
        res.render('admin/404.ejs', {
            title: "Error",
            layout: "layouts/admin",
            error: error.message
        })
    }
}

// ********************************* users Page *********************************
export const dashboard_users = async (req, res) => {
    try {
        await connectDB()
        const users = await User.find()
        res.render('admin/users', {
            users: users,
            title: "Users",
            layout: "layouts/admin"
        });
    } catch (error) {
        res.render('admin/404.ejs', {
            title: "Error",
            layout: "layouts/admin",
            error: error.message
        })
    }
}


// ********************************* Setting Page *********************************
export const dashboard_setting = async (req, res) => {
    try {
        await connectDB()
        const setting = await Setting.findOne();
        if (setting) {
            res.render('admin/setting',
                {
                    setting,
                    layout: "layouts/admin",
                    title: "Setting"
                });
        }
        else {
            res.render('admin/setting', {
                layout: "layouts/admin",
                title: "Setting"

            });
        }

    } catch (error) {
        res.render('admin/404.ejs', {
            title: "Error",
            layout: "layouts/admin",
            error: error.message
        })
    }
}



// ********************************* App Setting Page *********************************
export const dashboard_app_setting = async (req, res) => {
    try {
        await connectDB();
        const setting = await AppSetting.findOne();
        console.log(setting)
        res.render('admin/appsetting', {
            setting: setting
        })
    } catch (error) {
        res.render('admin/404.ejs', {
            title: "Error",
            layout: "layouts/admin",
            error: error.message
        })
    }
}