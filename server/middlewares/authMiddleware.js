import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
    try {
        // التحقق من وجود التوكن في الهيدر
        const token = req.headers.authorization?.split(" ")[1]; // استخراج التوكن بعد "Bearer"
        
        if (!token) {
            return res.status(401).json({ status: 401, message: "No token, authorization denied" });
        }

        // التحقق من صحة التوكن
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // إرفاق بيانات المستخدم بالطلب
        req.user = decoded;
        next(); // الانتقال إلى الخطوة التالية (المسار المطلوب)
        
    } catch (error) {
        return res.status(401).json({ status: 401, message: "Invalid token" });
    }
};
