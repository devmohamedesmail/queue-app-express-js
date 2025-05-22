import connectDB from "../../config/db.js";
import Queue from "../../models/Queue.js";
import Place from "../../models/Place.js";
import Service from "../../models/Service.js";
import User from "../../models/User.js"

export const bookQueue = async (req, res) => {
    try {
        await connectDB()

        const userId = req.params.user;
        const placeId = req.params.place;
        const serviceId = req.params.service;
        const place = await Place.findById(placeId);

        const newQueue = new Queue();
        newQueue.userId = userId;
        newQueue.placeId = placeId;
        newQueue.serviceId = serviceId;
        newQueue.place = place;
        await newQueue.save();
        res.status(201).json(newQueue);

    } catch (error) {
        res.status(400).json(error);
    }
}


// get last queue in the service
export const get_last_queue = async (req, res) => {
    try {
        await connectDB()
        const place = req.params.place;
        const service = req.params.service;
        const queue = await Queue.findOne({ placeId: place, serviceId: service }).sort({ createdAt: -1 })
        res.status(200).json(queue);
    } catch (error) {
        res.status(400).json(error);
    }
}



// get all queue in the service and place
export const get_all_queue_waiting_in_service = async (req, res) => {
    try {
        await connectDB()
        const place = req.params.place;
        const service = req.params.service;

        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        const queue = await Queue.find({
            placeId: place,
            serviceId: service,
            status: 'waiting',
            createdAt: { $gte: todayStart, $lte: todayEnd }
        }).sort({ createdAt: -1 })
        res.status(200).json(queue);
    } catch (error) {
        res.status(400).json(error);
    }
}


// get first active queue in the service
export const get_first_active_queue_in_service = async (req, res) => {
    try {
        await connectDB()
        const place = req.params.place;
        const service = req.params.service;
        const queue = await Queue.findOne({
            placeId: place,
            serviceId: service,
            status: 'active'
        }).sort({ createdAt: -1 })
        res.status(200).json(queue);
    } catch (error) {
        res.status(400).json(error);
    }
}








// *************************  get all user queues according day *************************
export const get_all_users_queues_today = async (req, res) => {
    try {
        await connectDB()
        const userId = req.params.id;
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);


        const userQueues = await Queue.find({
            userId: userId,
            status: 'waiting',
            createdAt: { $gte: todayStart, $lte: todayEnd }
        }).sort({ createdAt: 1 });


        if (userQueues.length === 0) {
            return res.status(200).json({
                status: 200,
                message: "No queues found for this user today",
                queues: [] ,
            });
        }

        const queuesData = [];
        // Loop through each queue to calculate aheadOfYou, nowServing, and estimatedTime
        for (let queue of userQueues) {
            const { placeId, serviceId } = queue;
            const place = await Place.findById(placeId);
            const service = await Service.findById(serviceId);

            // Calculate ahead of you
            const aheadOfYou = await Queue.countDocuments({
                placeId,
                serviceId,
                status: 'waiting',
                createdAt: { $gte: todayStart, $lte: todayEnd }, // Only today's queues
                createdAt: { $lt: queue.createdAt } // Users before this one in the same service
            });

            // Find the first active queue for the same placeId and serviceId
            const nowServing = await Queue.findOne({
                placeId,
                serviceId,
                status: 'active',
                createdAt: { $gte: todayStart, $lte: todayEnd }
            }).sort({ queue: -1 });

            // Calculate estimated time based on people ahead of the user
            // const estimatedTime = aheadOfYou * 5; 
            let estimatedTime;
            if (service && service.estimateTime) {
                estimatedTime = aheadOfYou * service.estimateTime;
            } else {
                estimatedTime = aheadOfYou * place.estimateTime;
            }

            // Collect the result for this queue
            queuesData.push({
                queue,
                aheadOfYou,
                nowServingQueue: nowServing ? nowServing.queue : null,
                estimatedTime
            });
        }

        // res.status(200).json(queuesData);
        res.status(200).json({
            status: 200,
            message: "Queues retrieved successfully",
            queues: queuesData
        });



    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: "An error occurred while retrieving the user's queues", 
            error: error.message || error });
    }
}






// get all queues of the user for history
export const get_all_user_queues_history = async (req, res) => {
    try {
        await connectDB()
        const user = req.params.id;
        const queues = await Queue.find({ userId: user }).sort({ createdAt: -1 })
        res.status(200).json(queues);
    } catch (error) {
        res.status(400).json(error);
    }
}








// cancel my Queue 
export const cancel_queue = async (req, res) => {
    try {
        await connectDB()
        const id = req.params.id;
        const queue = await Queue.findById(id)
        queue.status = 'cancelled';
        await queue.save();
        res.status(200).json(queue);
    } catch (error) {
        res.status(400).json(error);
    }
}


// move to back
export const move_queue_to_back = async (req, res) => {
    try {
        await connectDB();
        const { queueId } = req.params;
        const old_queue = await Queue.findById(queueId);
        if (!old_queue) {
            return res.status(404).json({ message: " Queue Not Found " });
        }

        old_queue.status = "cancelled";
        await old_queue.save();

        const new_queue = new Queue();

        new_queue.userId = old_queue.userId;
        new_queue.placeId = old_queue.placeId;
        if (old_queue.serviceId) {
            new_queue.serviceId = old_queue.serviceId;
        }

        new_queue.place = old_queue.place;



        await new_queue.save();
        res.status(200).json({
            message:"Queue Moved Successfully",
            queue:new_queue
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}



// subscriber_active_queue
export const subscriber_active_queue = async (req,res) =>{
    try {
        await connectDB();
        const queueId = req.params.queueId;
        const userId = req.params.userId;
    
        const queue = await Queue.findById(queueId);
        if (!queue) {
            return res.status(404).json({ message: "Queue not found" });
        }
    
        const employee = await User.findById(userId);
        queue.status = "active";
        queue.employee = employee;
        const queue_updated = await queue.save();
        res.json({
            status:200,
            data:queue_updated,
        });

        
    } catch (error) {
        res.json({
            status:400,
            error:error.message
        });
    }
}









