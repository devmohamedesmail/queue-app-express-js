import connectDB from "../../config/db.js";
import Queue from "../../models/Queue.js";
import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import moment from 'moment';

export const redirect_to_index = (req, res)=>{
    try {
        const user = req.session.user;
        res.render('subscriber/index', {
            layout: "layouts/subscriber",
            title: "Subscriber",
            user: user,
        });
    } catch (error) {
        res.render('error', {
            layout: "layouts/error",
            title: "Error",
            message: error.message,
        });
    }
}





export const redirect_to_statistics = async(req, res)=>{
    const user = req.session.user;
    const placeId = req.params.id;

    try {
        await connectDB()
        const queues = await Queue.find({ placeId }); // جلب الطوابير

        res.render('subscriber/statistics', {
            layout: "layouts/subscriber",
            title: "Subscriber Statistics",
            user,
            queues, 
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
}




export const redirect_to_users = async(req, res)=>{
    
    try {
        const user = req.session.user;
        const placeId = req.params.id;
        await connectDB()
        const users = await User.find({ placeId }); 
        res.render('subscriber/users', {
            layout: "layouts/subscriber",
            title: "Subscriber Users",
            users:users,
            user: user,
        });
    } catch (error) {
        res.render('404',{
            layout: "layouts/main",
            title: "Error",
            message: error.message,
        });
    }
}




export const create_new_user_for_place = async (req,res) =>{
    const {name, email, password } = req.body;
    const user = req.session.user;
    const placeId = req.params.placeId;

    try {
        await connectDB()
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({
            name:name,
            email: email,
            password: hashedPassword,
            role: 'subscriber',
            place:placeId,
        });

        await newUser.save();

        res.redirect(`/subscriber/users/${placeId}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error", error.message);
    }
}



export const redirect_to_setting = async (req, res) => {
    try {
        res.render('subscriber/setting', {
            layout: "layouts/subscriber",
            title: "Subscriber Setting",
        });
    } catch (error) {
        res.send('error', {
            layout: "layouts/error",
            title: "Error",
            message: error.message,
        });
    }
}




export const redirect_to_queues = async (req, res) => {
    try {
        await connectDB()
        const startOfDay = moment().startOf('day').toDate(); 
        const endOfDay = moment().endOf('day').toDate()

        // const queues = await Queue.find({
        //     placeId: req.params.id,
        //     createdAt: {
        //         $gte: startOfDay,
        //         $lt: endOfDay
        //     }
        // }); 
        
        const queues = await Queue.find({ placeId: req.params.placeId })
            
       
        res.render('subscriber/queues', {
            layout: "layouts/subscriber",
            title: "Subscriber Queues",
            queues: queues,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).render('404', {
            layout: "layouts/main",
            title: "Error",
            message: error.message,
            
        });
    }
}