import { title } from "process";
import connectDB from "../config/db.js"
import Place from "../models/Place.js";
import User from "../models/User.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ********************************* Register User **********************************
export const register_user = async (req, res) => {
    try {
        await connectDB();
        const { email, password } = req.body;


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: 400, message: "Email already exists" });
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);


            const newUser = new User()
            newUser.email = email
            newUser.password = hashedPassword

            await newUser.save()

            const token = jwt.sign(
                { id: newUser._id },
                process.env.JWT_SECRET, // تأكد من وجود متغير JWT_SECRET في .env
                { expiresIn: "7d" } // صلاحية التوكن 7 أيام
            );

            res.render('front/index.ejs')
        }





    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}


// ********************************* Login User *************************************
export const login_user = async (req, res) => {
    try {
        await connectDB();
        const places = await Place.find()
        const users = await User.find()

        const { email, password } = req.body;

        // التحقق من إدخال جميع البيانات
        if (!email || !password) {
            return res.status(400).json({ status: 400, message: "Email and password are required" });
        }

        // البحث عن المستخدم في قاعدة البيانات
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ status: 401, message: "Invalid email or password" });
        }

        // مقارنة كلمة المرور المدخلة مع المخزنة
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ status: 401, message: "Invalid email or password" });
        }

        // إنشاء التوكن
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" } // التوكن صالح لمدة 7 أيام
        );


         // Set token as a cookie or in local storage
         res.cookie("auth_token", token, {
            httpOnly: true, // Secure the cookie from JS access
            secure: process.env.NODE_ENV === "production", // Only use secure cookies in production
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        });


        if (user.role === 'admin') {
            res.redirect('/dashboard/index')
            // res.render('admin/index.ejs', {
            //     places: places,
            //     users:users,
            //     layout: "layouts/admin",
            //     title: "Dashboard"
            // })
        } else {
            res.render('front/index.ejs')
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: error.message });
    }
}



// Delete User
export const delete_user = async (req,res) =>{
    try {
        const users = User.find()
        const id = req.params.id;
        await User.findByIdAndDelete(id);
        res.render('admin/users',{
            users:users
        })
    } catch (error) {
        
    }
}




