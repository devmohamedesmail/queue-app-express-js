import Queue from "../models/Queue.js";












export const change_queue_to_active = async (req, res) => {
    
    try {
        const id = req.params.id;
        const queue = await Queue.findById(id);
        if (!queue) {
            return res.status(404).json({ message: "Queue not found" });
        }
        queue.status = "active";
        await queue.save();
       
        res.redirect('back');
    } catch (error) {
        
        res.redirect('back');
    }
}