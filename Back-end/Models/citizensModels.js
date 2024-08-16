// يستورد إعدادات Knex من ملف التكوين، الذي يحتوي على تفاصيل الاتصال بقاعدة البيانات.
const knex = require("../config/db");
class Citizens {
  static async GetCitizens() {
    try {
      // knex يمثل الاتصال بقاعدة البيانات عبر مكتبة Knex.js يعني كأنها pool connection
      // تستخدم Knex لتحديد الجدول الذي ستعمل عليه في الاستعلام بحيث داخل القوسين بمثل اسم الجدول تبعي الموجود في postegress
      // .select("*") في Knex.js تُستخدم لتحديد الأعمدة التي ترغب في استرجاعها من الجدول
      // SELECT * FROM table_name; صارت في حال ال knex عبارة عن knex("table_name").select("*") والسبب انو حكينا قبل انها عبارة عن Query Builder
      const allCitizens = await knex("citizens").select("*");
      return allCitizens;
    } catch (err) {
      console.error("Error getting citizens:", err);
      throw err;
    }
  }
}
module.exports = Citizens;
