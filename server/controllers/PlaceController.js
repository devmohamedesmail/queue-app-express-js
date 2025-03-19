import Place from "../models/Place.js";
import connectDB from "../config/db.js";



// *********************** Places Page ********************************
export const places = async (req,res) =>{
    try {
        connectDB()
        const places = await Place.find();
        res.render('admin/places/index',{
            places:places
        });
    } catch (error) {
       console.log(error) 
    }
}


// ************************** Add new Place *****************************
export const add_new_place = async (req,res)=>{
    try {
        connectDB()
        const newPlace = new Place();
        newPlace.name = req.body.name;
        newPlace.description = req.body.description;
        newPlace.image = req.file.filename;
        newPlace.address = req.body.address;
        newPlace.location = {
            lat: req.body.lat,
            lng: req.body.lng
        }
        const place = await newPlace.save();
        res.redirect("/admin/places")
    } catch (error) {
        res.json(error)
    }
}



// ********************** Edit Place Page **************************
export const edit_place_page = async(req,res) =>{
    try {
        await connectDB();
        const place = await Place.findById(req.params.id)
        res.render('admin/places/edit', {
            place: place
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
        place.name = req.body.name;
        place.address = req.body.address;
        place.description = req.body.description;
        place.location.lat = req.body.lat;
        place.location.lng = req.body.lng;
        place.image = req.file.filename;
        await place.save();


        res.send(place)

    } catch (error) {
        console.log(error)
    }
}




// Delete
export const delete_place = async (req,res)=>{
    try {
        await connectDB()
        const id = req.params.id;
        const place = Place.findByIdAndDelete(id)
    } catch (error) {
        console.log(error)
    }
}