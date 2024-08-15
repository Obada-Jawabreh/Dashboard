const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware للتحقق من صحة التوكن
const auth = (req, res, next) => {
  try {
    // التأكد من وجود Header خاص بالتوكن
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    // استخراج التوكن من الـ Header
    const token = authHeader.replace("Bearer ", "");

    // التحقق من صحة التوكن وفك تشفيره
    const decoded = jwt.verify(token, JWT_SECRET);

    // تخزين البيانات المفكوكة في الطلب للتحقق منها في الخطوات التالية
    req.tokenValid = decoded;

    // الانتقال إلى الخطوة التالية في الـ Middleware chain
    next();
  } catch (error) {
    console.error("Authentication error:", error.message); // تسجيل الخطأ
    res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = auth;
