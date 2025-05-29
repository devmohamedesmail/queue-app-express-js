import connectDB from "../../config/db.js";
import Place from "../../models/Place.js";
import Service from "../../models/Service.js"
import QRCode from 'qrcode';
import { v2 as cloudinary } from 'cloudinary';

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
            const uploadResult = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'places' },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );
                stream.end(req.file.buffer);
            });

            newPlace.image = uploadResult.secure_url;
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




// update Place
export const update_place = async (req, res) => {
    try {
        await connectDB();

        const placeId = req.params.placeId;
        const place = await Place.findById(placeId);

        if (!place) {
            return res.status(404).json({ status: 404, message: 'Place not found' });
        }

        // Update place fields
        place.nameEn = req.body.nameEn || place.nameEn;
        place.nameAr = req.body.nameAr || place.nameAr;
        place.addressEn = req.body.addressEn || place.addressEn;
        place.addressAr = req.body.addressAr || place.addressAr;
        place.description = req.body.description || place.description;

        if (req.file) {
            const uploadResult = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'places' },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );
                stream.end(req.file.buffer);
            });

            place.image = uploadResult.secure_url;
        }

        place.location = {
            lat: req.body.lat || place.location.lat,
            lng: req.body.lng || place.location.lng
        };

        place.locationlink = req.body.locationlink || place.locationlink;
        place.timeStart = req.body.timeStart || place.timeStart;
        place.timeClosed = req.body.timeClosed || place.timeClosed;
        place.moveTurn = req.body.moveTurn !== undefined ? req.body.moveTurn === 'true' : place.moveTurn;
        place.estimateTime = req.body.estimateTime || place.estimateTime;

        // Update daysOfWork
        if (req.body.daysOfWork) {
            try {
                place.daysOfWork = JSON.parse(req.body.daysOfWork);
            } catch (err) {
                return res.status(400).json({ status: 400, message: 'Invalid daysOfWork JSON' });
            }
        }

        await place.save();

        // Update services
        if (req.body.services) {
            let servicesArray = [];
            try {
                servicesArray = JSON.parse(req.body.services);
            } catch (err) {
                return res.status(400).json({ status: 400, message: 'Invalid services JSON' });
            }

            // Delete old services
            await Service.deleteMany({ placeId: place._id });

            // Add new services
            if (Array.isArray(servicesArray) && servicesArray.length > 0) {
                const servicesToInsert = servicesArray.map(service => ({
                    placeId: place._id,
                    nameAr: service.titleAr,
                    nameEn: service.titleEn,
                    estimateTime: service.estimatedTime || 0
                }));

                await Service.insertMany(servicesToInsert);
            }
        }

        res.json({
            status: 200,
            message: 'Place updated successfully',
            data: place
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error.message
        });
    }
};




export const delete_place = async (req, res) => {
    try {
        await connectDB();
        const placeId = req.params.placeId;
        const place = await Place.findByIdAndDelete();
        await Service.deleteMany({ placeId: place._id });
        res.json({
            status: 200,
            message: "Place Deleted Successfully"
        })
    } catch (error) {
        res.json({
            status: 400,
            message: error.message
        })
    }
}





export const show_place_qrcode = async (req, res) => {
    try {
        await connectDB();
        const placeId = req.params.placeId;
        const place = await Place.findById(placeId);

        // Generate the QR code URL (you can adjust the URL based on where you want to redirect)
        const qrUrl = `https://queue-app-liart.vercel.app/pages/user/services/${placeId}`;

        // Generate QR code
        QRCode.toDataURL(qrUrl, (err, qrCodeDataUrl) => {
            if (err) {
                return res.status(500).send('Error generating QR code');
            }

            res.json({
                status: 200,
                place: place,
                qrCodeDataUrl: qrCodeDataUrl
            })
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error.message,
        });
    }
}
