import connectDB from "../../config/db.js"
import User from "../../models/User.js"
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
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            res.status(201).json({
                status: 201,
                message: "User registered successfully",
                user: {
                    user: newUser,
                    token: token,
                },
            });
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

        res.status(200).json({
            status: 200,
            message: "Login successful",
            user: {
                user: user,
                token: token,
            },
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: error.message });
    }
}


// Edit user
export const edit_user = async (req, res) => {
    try {
        await connectDB();
        const userId = req.params.userId;
        const { name, phone, address, email, password } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }
        if (name) {
            user.name = name;
        }

        if (phone) {
            user.phone = phone;
        }

        if (address) {
            user.address = address;
        }


        if (email) {
            user.email = email;
        }
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }
        await user.save();
        res.status(200).json({
            status: 200,
            message: "User updated successfully",
            user: user,
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}



