import Place from "../models/Place.js";
import connectDB from "../config/db.js";
import Service from "../models/Service.js";






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
        res.redirect("/dashboard/places");
        
    } catch (error) {
        console.log(error)
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
            services: services
        })
    } catch (error) {

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
        res.redirect('/places/places')

    } catch (error) {
        console.log(error)
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
        console.log(error)
    }
}