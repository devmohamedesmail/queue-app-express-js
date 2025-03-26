import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
    try {
      
        // استخراج التوكن من الكوكيز
        const token = req.cookies.auth_token;
       

        if (!token) {
            return res.render('front/login.ejs')
           // return res.status(401).json({ status: 401, message: "No token, authorization denied" });
        }

        // التحقق من صحة التوكن
       // const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // إرفاق بيانات المستخدم بالطلب
       // req.user = decoded;
        next(); // الانتقال إلى المسار المطلوب
        
    } catch (error) {
      
        return res.status(401).json({ status: 401, message: "Invalid token" });
    }
};

