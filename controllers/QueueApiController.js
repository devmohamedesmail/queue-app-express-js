import connectDB from "../config/db.js";
import Queue from "../models/Queue.js";
import Place from "../models/Place.js";

export const bookQueue = async (req, res) => {
    try {
        await connectDB()

        const  userId  = req.params.user;
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
        const queue = await Queue.find({ 
            placeId: place,
            serviceId: service,
            status: 'waiting'
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





//  get all user queues according day
export const get_all_users_queues = async (req, res) => {
    try {

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
            return res.status(404).json({ message: "No queues found for this user today" });
        }

       
        res.status(200).json(userQueues);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while retrieving the user's queues", error });
    }
}





// move to back
export const move_queue_to_back = async (req, res) => {
    try {
        await connectDB();
        const { id, place, service, number } = req.params;
       
        // Parse the number parameter to ensure it's a number
        const targetNumber = parseInt(number, 10);

        if (isNaN(targetNumber)) {
            return res.status(400).json({ message: 'Invalid number parameter' });
        }

        const queue = await Queue.findById(id);
         
        if (!queue) {
            return res.status(404).json({ message: "Queue not found" });
        }

        // Fetch all queues based on the provided place and service (if applicable)
        let queuesQuery = Queue.find({ status: 'waiting' });

        if (place) {
            queuesQuery = queuesQuery.where('place').equals(place);
        }
        if (service) {
            queuesQuery = queuesQuery.where('service').equals(service);
        }

        const queues = await queuesQuery.sort({ createdAt: 1 }); // Sort by creation date to simulate queue order

        // Find the position of the user's queue
        const userPosition = queues.findIndex(q => q._id.toString() === id);

        if (userPosition === -1) {
            return res.status(404).json({ message: "Queue not found in the waiting list" });
        }

        // Check how many people are ahead of the user's queue
        const peopleAhead = userPosition;

        if (targetNumber >= peopleAhead) {
            // Move the queue to the end if the target number is greater than or equal to the number of people ahead
            queue.status = 'waiting';
            await queue.save();
            res.status(200).json({ message: 'Queue moved to the end successfully', queue });
        } else {
            // Otherwise, move the queue according to the target number
            const newPosition = userPosition - targetNumber;

            // Ensure new position does not go negative
            const finalPosition = Math.max(0, newPosition);

            // Move the queue to the desired position
            queues.splice(finalPosition, 0, queues.splice(userPosition, 1)[0]); // Move the user's queue to the new position

            // Save the updated queue order
            for (let i = 0; i < queues.length; i++) {
                queues[i].status = 'waiting';
                await queues[i].save();
            }

            res.status(200).json({ message: 'Queue moved successfully', queue });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}





// get Queue Details by service id and place id
export const get_queue_details_by_service_id_and_place_id = async (req,res)=>{
    try {
        await connectDB()
        const { place, service } = req.params;
        const queueDetails = await Queue.find({ placeId: place, serviceId: service });
        
        if (!queueDetails || queueDetails.length === 0) {
            return res.status(404).json({ message: "No queue details found for this service and place" });
        }
        
        res.status(200).json(queueDetails); 
    } catch (error) {
        res.status(400).json(error);
        
    }
}





