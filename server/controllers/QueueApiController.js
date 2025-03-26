import connectDB from "../config/db.js";
import Queue from "../models/Queue.js";

export const bookQueue = async (req, res) => {
    try {
        await connectDB()
        const newQueue = new Queue();
        newQueue.userId = req.body.userId;
        newQueue.placeId = req.body.placeId;
        newQueue.serviceId = req.body.serviceId;
        await newQueue.save();
        res.status(201).json(newQueue);
        // res.send(req.body)
    } catch (error) {
        res.status(400).json(error);
    }
}