import connectDB from "../../config/db.js";
import AppSetting from "../../models/AppSetting.js";
import Place from "../../models/Place.js";
import Setting from "../../models/Setting.js";
import User from "../../models/User.js";
import Service from "../../models/Service.js";





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



// *****************************************************************************************
// ************************************ Place Fucntions ************************************
// *****************************************************************************************

// ************************** Add new Place *****************************
export const add_new_place = async (req,res)=>{
    try {
        connectDB()
        const newPlace = new Place();
        newPlace.nameEn = req.body.nameEn;
        newPlace.nameAr = req.body.nameAr;
        newPlace.addressEn = req.body.addressEn;
        newPlace.addressAr = req.body.addressAr;
        newPlace.description = req.body.description;
        newPlace.image = req.file.filename;
        newPlace.location = {
            lat: req.body.lat,
            lng: req.body.lng
        }

        newPlace.timeStart = req.body.timeStart;
        newPlace.timeClosed = req.body.timeClosed;
        newPlace.daysOfWork = req.body.daysOfWork || [];

         await newPlace.save();
        res.redirect("/admin/places");
        
    } catch (error) {
        res.render('admin/404.ejs', {
            title: "Error",
            layout: "layouts/admin",
            error: error.message
        })
    }
}



// ********************** Edit Place Page **************************
export const edit_place_page = async(req,res) =>{
    try {
        await connectDB();
        const place = await Place.findById(req.params.id)
        const services = await Service.find({placeId: req.params.id})
        res.render('admin/places/edit', {
            place: place,
            layout: "layouts/admin",
            title: "Edit Place",
            services: services
        })
    } catch (error) {
        res.render('admin/404.ejs', {
            title: "Error",
            layout: "layouts/admin",
            error: error.message
        })
    }
}



// ******************************* Edit Place Confirmation *******************************
export const edit_place_confirm = async(req,res)=>{
    try {

        await connectDB()
        const id = req.params.id;
        const place = await Place.findById(id)
        if (!place) {
            return res.status(404).json({ message: " Place Not Found " });
        }
        place.nameEn = req.body.nameEn;
        place.nameAr = req.body.nameAr;
        place.addressEn = req.body.addressEn;
        place.addressAr = req.body.addressAr;
        place.description = req.body.description;
        place.location.lat = req.body.lat;
        place.location.lng = req.body.lng;
        if (req.file) {
            place.image = req.file.filename;
        }
        await place.save();
        res.redirect('/admin/places')

    } catch (error) {
        res.render('admin/404.ejs', {
            title: "Error",
            layout: "layouts/admin",
            error: error.message
        })
    }
}




// Delete
export const delete_place = async (req,res)=>{
    try {
        await connectDB()
        const id = req.params.id;
        const place = await Place.findByIdAndDelete(id)
        res.redirect('/places/places')
       
    } catch (error) {
        res.render('admin/404.ejs', {
            title: "Error",
            layout: "layouts/admin",
            error: error.message
        })
    }
}