import connectDB from "../../config/db.js"
import Help from "../../models/Help.js";
import Queue from "../../models/Queue.js";
import User from "../../models/User.js";
import mongoose from "mongoose";

export const send_help = async (req, res) => {
    try {
        await connectDB();
        const { userId, topic, message } = req.body;
        const user = await User.findOne({ _id: userId });
        const help = new Help({
            userId: userId,
            topic: topic,
            user: user,
            message: message,
        })
        await help.save();
        res.status(200).json({ status: 200, message: "Help added successfully", help: help })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: 500, message: "Something went wrong" })
    }
}


// show_help_replies
export const show_help_replies = async (req, res) => {
    try {
        const userId = req.params.userId;
        await connectDB();
        const help = await Help.find({ userId: userId });
        res.status(200).json({ status: 200, help: help })
    } catch (error) {

    }
}




//********************************  users api routes ************************** */
export const show_users = async (req, res) => {
    try {
        await connectDB();
        const users = await User.find();
        res.status(200).json({ status: 200, users: users });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Something went wrong" });
    }
}





// fetch all queues for place 
export const fetch_queues_for_place = async (req, res) => {
    try {
        await connectDB();
        const placeId = req.params.placeId;
        const queues = await Queue.find({
            placeId: placeId
        })
        res.json({
            status: 200,
            data: queues
        })
    } catch (error) {
        res.json({
            status: 400,
            error: error.message
        })
    }
}



export const fetch_queues_for_employee = async (req, res) => {
    try {
        await connectDB();
        const employeeId = req.params.employeeId;
        const objectId = new mongoose.Types.ObjectId(employeeId);
       
        const queues = await Queue.find({ "employee._id": objectId })
             

        res.json({
            status: 200,
            data: queues
        })
    } catch (error) {
        res.json({
            status: 400,
            error: error.message
        })
    }
}