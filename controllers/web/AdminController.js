import connectDB from "../../config/db.js";

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
        const places = await Place.find();
        res.render('admin/users', {
            users: users,
            places: places,
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








// *****************************************************************************************
// ************************************ Place Fucntions ************************************
// *****************************************************************************************

// ************************** Add new Place *****************************
export const add_new_place = async (req, res) => {
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
        newPlace.locationlink = req.body.locationlink;
        newPlace.timeStart = req.body.timeStart;
        newPlace.timeClosed = req.body.timeClosed;
        newPlace.daysOfWork = req.body.daysOfWork || [];
        newPlace.moveTurn = req.body.moveTurn === 'true';
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
export const edit_place_page = async (req, res) => {
    try {
        await connectDB();
        const place = await Place.findById(req.params.id)
        const services = await Service.find({ placeId: req.params.id })
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
export const edit_place_confirm = async (req, res) => {
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
        place.locationlink = req.body.locationlink;
        if (req.file) {
            place.image = req.file.filename;
        }
        place.moveTurn = req.body.moveTurn === 'true';
        await place.save();

        res.redirect(`/admin/edit/place/${place._id}`);

    } catch (error) {
        res.render('admin/404.ejs', {
            title: "Error",
            layout: "layouts/admin",
            error: error.message
        })
    }
}




// *******************************  Delete Place Function *****************************
export const delete_place = async (req, res) => {
    try {
        await connectDB()
        const id = req.params.id;
        const place = await Place.findByIdAndDelete(id)
        res.redirect('/admin/places')

    } catch (error) {
        res.render('admin/404.ejs', {
            title: "Error",
            layout: "layouts/admin",
            error: error.message
        })
    }
}



// *****************************************************************************************
// ************************************ Services Fucntions ************************************
// *****************************************************************************************
export const addNewService = async (req, res) => {
    try {
        await connectDB();
        const id = req.params.id;
        const place = await Place.findById(id)
        const services = await Service.find({ placeId: id })

        // the the service
        const newService = new Service()
        newService.placeId = id;
        newService.nameAr = req.body.serviceAr;
        newService.nameEn = req.body.serviceEn;
        await newService.save();


        res.redirect(`/admin/edit/place/${place._id}`);

    } catch (error) {
        console.log(error)
    }
}



export const edit_service = async (req, res) => {
    try {
        await connectDB();

        const placeId = req.params.place;
        const place = await Place.findById(placeId)
        const serviceId = req.params.service;
        const service = await Service.findById(serviceId)
        service.nameAr = req.body.nameAr;
        service.nameEn = req.body.nameEn;
        await service.save();
        res.redirect(`/admin/edit/place/${place._id}`);
    } catch (error) {
        console.log(error)
    }
}



// **************************************** Delete Existing Service *********************************************
export const delete_service = async (req, res) => {

    try {
        const place = req.params.place;
        const serviceId = req.params.service;
        await connectDB();
        await Service.findByIdAndDelete(serviceId)
        // res.redirect(`/places/places`)
        res.redirect(`/admin/edit/place/${place._id}`);
    } catch (error) {
        console.log(error)
    }
}







// *****************************************************************************************
// ************************************ Setting Fucntions ************************************
// *****************************************************************************************
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
            res.redirect('/admin/setting');
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
            res.redirect('/admin/setting');
        }
        
    } catch (error) {
        
        res.render('admin/404.ejs', {
            title: "Error",
            layout: "layouts/admin",
            error: error.message
        })

    }
}





// *****************************************************************************************
// ************************************ Setting Fucntions ************************************
// *****************************************************************************************
export const edit_user = async (req, res) => {
    try {
        await connectDB();
        const userId = req.params.id;
        const users = await User.find()
        const places = await Place.find();
        const user = await User.findById(userId);
        user.name = req.body.name;
        user.place = req.body.place;
        user.role = req.body.role;
        await user.save();
        res.render('admin/users', {
            users: users,
            places: places,
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