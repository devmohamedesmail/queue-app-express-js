import connectDB from "../../config/db.js";
import Place from "../../models/Place.js";


export const fetch_places_with_services = async (req, res) => {
    try {
        await connectDB()
        const places = await Place.aggregate([
            {
                $lookup: {
                    from: "services",
                    localField: "_id",
                    foreignField: "placeId",
                    as: "services"
                }
            }
        ]);
        res.json({
            status: 200,
            data: places,
            message: 'Places retrieved successfully'
        });
    } catch (error) {
        console.log(error);
        res.json({
            status: 404,
            message: error
        });
    }

}




// add_new_place
export const add_new_place = async (req,res) =>{
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
        newPlace.estimateTime = req.body.estimateTime;
        await newPlace.save();

        if (req.body.services && Array.isArray(req.body.services)) {
            const servicesToInsert = req.body.services.map(service => ({
                placeId: newPlace._id,
                nameAr: service.serviceTitleAr,
                nameEn: service.serviceTitleEn,
                estimateTime: service.serviceEstimatedTime || 0
            }));

            await Service.insertMany(servicesToInsert);
        }


        res.json({
            status: 200,
            message: 'Place added successfully',
            data: newPlace
        });

    } catch (error) {  
        res.json({
            status: 404,
            message: error
        });
    }
}