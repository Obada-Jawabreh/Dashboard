const knex = require("../config/db");

class LocalListCount {
  /**
   * حساب مجموع عدد الأصوات بناءً على اسم القائمة والدائرة
   * @param {string} listName - اسم القائمة لتصفية البيانات
   * @param {number} districtId - معرّف الدائرة لتصفية البيانات
   * @returns {Promise<number>} - مجموع عدد الأصوات
   */
  static async getVoteCountByListAndDistrict(listName, districtId) {
    try {
      console.log(
        `Calculating vote count for listName: ${listName}, districtId: ${districtId}`
      );

      // حساب مجموع الأصوات مفلترًا حسب اسم القائمة والدائرة
      const result = await knex("lists")
        .where("list_name", listName)
        .andWhere("district_id", districtId)
        .sum("vote_count as totalVotes");

      console.log("Query result:", result);

      // النتيجة ستكون مصفوفة تحتوي على كائن
      const totalVotes = result[0] ? result[0].totalVotes : 0;
      console.log(`Total votes: ${totalVotes}`);

      return totalVotes; // إرجاع مجموع الأصوات أو 0 إذا لم تكن هناك نتائج
    } catch (err) {
      console.error("Error getting vote count:", err);
      throw err;
    }
  }
}

module.exports = LocalListCount;
