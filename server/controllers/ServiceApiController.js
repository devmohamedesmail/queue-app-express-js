import connectDB from "../config/db.js";
import Service from "../models/Service.js";
import Queue from "../models/Queue.js";


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


// get last queue in the service
export const get_last_queue = async (req,res)=>{
    try {
        const place = req.params.place;
        const service = req.params.service;
        await connectDB()
        console.log(place, service)
        const queue = await Queue.findOne({placeId: place, serviceId: service}).sort({createdAt: -1})
        res.json({
            status: 200,
            queue: queue,
            message: 'Queue fetched successfully'
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: 400,
            message: 'Error fetching queue',
            error: error.message || 'Unknown error occurred'
        })
    }
}