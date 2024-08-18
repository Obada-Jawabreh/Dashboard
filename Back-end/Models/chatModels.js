const knex = require("../config/db");
class Chat {
  static async GetNId() {
    try {
      const result = await knex("chat").distinct('national_id');
      return result;
    } catch (error) {
      console.error("Error Get chat:", error);
      throw error;
    }
  }

  // -------------------------------Get------------------------------------------------------

  static async GetMessage(nationalId) {
    try {
      const result = await knex("chat")
        .join("citizens", "chat.national_id", "=", "citizens.national_id")
        .select(
          "chat.*",
          "citizens.name",
          "citizens.email",
          "citizens.religion",
          "citizens.governorate"
        )
        .where("chat.national_id", nationalId) // إضافة شرط لجلب الرسائل الخاصة بالمستخدم المحدد
        .orderBy("chat.timestamp", "desc"); // ترتيب الرسائل حسب التوقيت;
      // .select("chat.*", "citizens.*"); هيك بتجيب كل الداتا الي بين الجدولين
      return result;
    } catch (error) {
      console.error("Error Get chat:", error);
      throw error;
    }
  }
  // -------------------------------post------------------------------------------------------

  static async PostMessage(national_id, Message) {
    try {
      await knex("chat").insert({
        national_id,
        Message,
        admin: true,
        Deleted: false,
      });
      return { message: "Message sent by admin." };
    } catch (error) {
      console.error("Database Error:", error.message); // إضافة تسجيل للخطأ
      throw new Error("Failed to send message.");
    }
  }
}
module.exports = Chat;
