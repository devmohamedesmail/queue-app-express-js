import connectDB from "../../config/db.js";
import Place from "../../models/Place.js";


export const getPlaces = async (req, res) => {
    try {
        await connectDB()
        const places = await Place.aggregate([
            {
                $lookup: {
                    from: "services", // يجب أن يكون نفس اسم المجموعة (collection) في MongoDB
                    localField: "_id",
                    foreignField: "placeId",
                    as: "services"
                }
            }
        ]);
        res.json({
            status: 200,
            data: places,
            message: 'Places retrieved successfully'
        });
    } catch (error) {
        console.log(error);
        res.json({
            status: 404,
            message: error
        });
    }

}