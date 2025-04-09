import { title } from "process";
import connectDB from "../../config/db.js"
import Place from "../../models/Place.js";
import User from "../../models/User.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Queue from "../../models/Queue.js";

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
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            res.render('front/index.ejs', {
                message: "User registered successfully",
                title: "Home",
                layout: "front/layout.ejs",
            })
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
       

        const { email, password } = req.body;
    
       
        // validation section

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
            { expiresIn: "7d" } 
        );


        // Set token as a cookie or in local storage
        res.cookie("auth_token", token, {
            httpOnly: true, // Secure the cookie from JS access
            secure: process.env.NODE_ENV === "production", 
            maxAge: 7 * 24 * 60 * 60 * 1000, 
        });

        req.session.user = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            placeId: user.place,
        };

        console.log(req.session.user);


        if (user.role === 'admin') {
            res.redirect('/dashboard/index')
        } else if (user.role === 'subscriber') {
            res.redirect('/subscriber/index')
        } else {
            res.render('front/index.ejs')
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: error.message });
    }
}





// ********************************* Logout User *************************************
export const logout_user = async (req, res) => {
    try {
       

      
        req.session.destroy((err) => {
            if (err) {
                console.log("Error destroying session:", err);
                return res.status(500).json({ status: 500, message: "Something went wrong during logout." });
            }
            
            res.clearCookie("auth_token");
            res.clearCookie("user_data");
            
            return res.render('front/login.ejs', {
                message: "User logged out successfully",
                title: "Login",
                layout: "layouts/front.ejs",
            });
           

        });
    } catch (error) {
        console.log("Logout error:", error);
        res.status(500).json({ status: 500, message: "Something went wrong." });
    }
}

// Delete User
export const delete_user = async (req, res) => {
    try {
        const users = User.find()
        const id = req.params.id;
        await User.findByIdAndDelete(id);
        res.render('admin/users', {
            users: users
        })
    } catch (error) {

    }
}




