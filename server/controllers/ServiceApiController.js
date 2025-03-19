import connectDB from "../config/db.js";
import Service from "../models/Service.js";


export const fetch_place_services = async (req, res) => {
    try {
        const id = req.params.id;
        await connectDB();
        const services = await Service.find({ placeId: id })
        res.json({
            status: 200,
            services: services,
            message: 'Services fetched successfully'
        })
    } catch (error) {

        res.json({
            status: 400,
            message: 'Error fetching services',
            error: error.message || 'Unknown error occurred'
        })
    }
};