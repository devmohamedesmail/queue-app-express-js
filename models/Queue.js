import mongoose from "mongoose";

const QueueSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: false,
        default: null,
    },
    serviceId: {
        type: String,
        required: false,
        default: null,
    },
    placeId: {
        type: String,
        required: false,
        default: null,
    },
    place:{
        type: mongoose.Schema.Types.Mixed,
        required: false,
        default: null,
    },
    queue: {
        type: Number,
        required: false,

    },
    status: {
        type: String,
        enum: ["waiting", "active", "cancelled"], // تحديد القيم المتاحة
        default: "waiting",
    },
}, { timestamps: true });


// Middleware to automatically set the queue number
QueueSchema.pre("save", async function (next) {
    if (!this.queue) {
        let query = { placeId: this.placeId };
        // If serviceId is not null, we add it to the query
        if (this.serviceId) {
            query.serviceId = this.serviceId;
        }

        const lastQueue = await this.constructor
            .findOne(query)
            .sort({ queue: -1 });

        // Set the queue number to the next one
        this.queue = lastQueue ? lastQueue.queue + 1 : 1;
    }
    next();
});

export default mongoose.model('Queue', QueueSchema)
