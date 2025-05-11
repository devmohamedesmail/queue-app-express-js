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
export const add_new_place = async (req, res) => {
    try {
        await connectDB();

        const newPlace = new Place();
        newPlace.nameEn = req.body.nameEn;
        newPlace.nameAr = req.body.nameAr;
        newPlace.addressEn = req.body.addressEn;
        newPlace.addressAr = req.body.addressAr;
        newPlace.description = req.body.description;

        if (req.file) {
            newPlace.image = req.file.filename;
        }

        newPlace.location = {
            lat: req.body.lat,
            lng: req.body.lng
        };
        newPlace.locationlink = req.body.locationlink;
        newPlace.timeStart = req.body.timeStart;
        newPlace.timeClosed = req.body.timeClosed;
        newPlace.moveTurn = req.body.moveTurn === 'true';
        newPlace.estimateTime = req.body.estimateTime;

        // Parse daysOfWork if it's a string
        try {
            newPlace.daysOfWork = JSON.parse(req.body.daysOfWork || '[]');
        } catch (err) {
            return res.status(400).json({ status: 400, message: 'Invalid daysOfWork JSON' });
        }

        await newPlace.save();

        // Parse and save services if provided
        let servicesArray = [];
        try {
            servicesArray = JSON.parse(req.body.services || '[]');
        } catch (err) {
            return res.status(400).json({ status: 400, message: 'Invalid services JSON' });
        }

        if (Array.isArray(servicesArray) && servicesArray.length > 0) {
            const servicesToInsert = servicesArray.map(service => ({
                placeId: newPlace._id,
                nameAr: service.titleAr,
                nameEn: service.titleEn,
                estimateTime: service.estimatedTime || 0
            }));

            await Service.insertMany(servicesToInsert);
        }

        res.json({
            status: 200,
            message: 'Place added successfully',
            data: newPlace
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error.message,
        });
    }
};
