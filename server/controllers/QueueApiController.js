import connectDB from "../config/db.js";
import Queue from "../models/Queue.js";

export const bookQueue = async (req, res) => {
    try {
        await connectDB()
        const place = req.params.place;
        const service = req.params.service;
        const newQueue = new Queue();
        newQueue.userId = req.body.userId;
        newQueue.placeId = place;
        newQueue.serviceId = service;
        await newQueue.save();
        res.status(201).json(newQueue);
        
    } catch (error) {
        res.status(400).json(error);
    }
}