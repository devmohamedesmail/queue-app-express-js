import mongoose from "mongoose";

const QueueSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        default: null,
    },
    serviceId: {
        type: String,
        required: false,
        default: null,
    },
    placeId: {
        type: String,
        required: true,
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


// **Middleware قبل الحفظ لزيادة queue تلقائيًا**
QueueSchema.pre("save", async function (next) {
    if (!this.queue) {
        const lastQueue = await this.constructor
            .findOne({ placeId: this.placeId })
            .sort({ queue: -1 });

        this.queue = lastQueue ? lastQueue.queue + 1 : 1;
    }
    next();
});

export default mongoose.model('Queue', QueueSchema)
