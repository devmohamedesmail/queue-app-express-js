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
        req.flash("success", "Queue status changed to active");
        res.redirect('back');
    } catch (error) {
        req.flash("error", "Error changing queue status");
        res.redirect('back');
    }
}