import connectDB from "../../config/db.js";
import Place from "../../models/Place.js";


export const getPlaces = async (req, res) => {
    try {
       await connectDB()
       const places = await Place.find();
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