import connectDB from "../../config/db.js"
import Help from "../../models/Help.js";
import User from "../../models/User.js";

export const send_help = async (req, res) => {
    try {
        await connectDB();
        const {userId, topic, message} = req.body;
        const user = await User.findOne({ _id: userId });
        const help = new Help({
            userId: userId,
            topic:topic,
            user:user,
            message:message,
        })
        await help.save();
        res.status(200).json({status:200, message:"Help added successfully", help:help})
    } catch (error) {
        console.log(error)
        res.status(500).json({status:500, message:"Something went wrong"})
    }
}


// show_help_replies
export const show_help_replies = async (req,res) =>{
    try {
        const userId = req.params.userId;
        await connectDB();
        const help = await Help.find({userId:userId});
        res.status(200).json({status:200, help:help})
    } catch (error) {
        
    }
}