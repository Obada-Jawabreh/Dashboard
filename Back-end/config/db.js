require("dotenv").config(); // تحميل متغيرات البيئة
const knex = require("knex");
const knexfile = require("../knexfile");

const environment = process.env.NODE_ENV || "development"; // تأخذ البيئة من متغير البيئة أو تعيينها إلى 'development' افتراضيًا
console.log(`Environment: ${environment}`); // تسجيل البيئة الحالية

const config = knexfile[environment];
console.log(`Configuration: ${JSON.stringify(config, null, 2)}`); // تسجيل إعدادات التكوين

if (environment === "development") {
  console.log("Running in development mode"); // إشعار بأننا في وضع التطوير

  config.connection = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };

  console.log(
    `Database Configuration: ${JSON.stringify(config.connection, null, 2)}`
  ); // تسجيل إعدادات قاعدة البيانات
}

const db = knex(config);
console.log("Database connection initialized"); // إشعار بأن الاتصال بقاعدة البيانات تم

module.exports = db;
