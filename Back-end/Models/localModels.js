// const knex = require("../config/db");

// class LocalListCount {
//   // ======================= Start Votes For One List ===========================
//   //   -------- حساب عدد اصوات قائمة واحدة في دائرة معينة ---------
//   // ________________________________
//   static async getVotesForOneList(listName, districtId) {
//     try {
//       console.log(
//         `Calculating vote count for listName: ${listName}, districtId: ${districtId}`
//       );
//       // استخدام knex للاستعلام عن قاعدة البيانات
//       const votesForOneList = await knex("lists")
//         // استخدمنا where لتحديد الشرط الذي يجب أن ينطبق على الصفوف
//         //  وهون الشرط بدي اياه حسب اسم القائمة ورقم الدائرة
//         // طرية الكتابة (اسم العمود، اسم القائمة داخل العمود)
//         .where("list_name", listName)
//         .andWhere("district_id", districtId)
//         // sum تقوم بجمع القيم في عمود محدد عبر جميع الصفوف التي تطابق شروط الاستعلام
//         // يعني هون بحكي مجموع القيم داخل عمود عدد الأصوات
//         // اما as  استخدمتها لأخبره انو اعطي اسم مستعار لهاد العمود بعد التجميع
//         // ترا هاد الاسم totalVotesForOneLIst خلص صرت قادرة استخدمه كأنه متغير عندي وخلي ببالك فكرة دائما القيمة الي بترجع من knex بتكون عبارة عن مصفوفة في حال استخدام sum avg count
//         // [ { totalVotesForOneLIst: 450 } ]
//         .sum("vote_count as total_votesForOneLIst");

//       console.log("Query votesForOneList:", votesForOneList);
//       // -------------------- total result start ---------------------

//       // التعامل مع النتيجة ك مصفوفة
//       //  votesForOneList[0] في حالة الاستعلام التجميعي، تحتوي المصفوفة الناتجة على كائن واحد فقط. هذا الكائن يحتوي على النتيجة الفعلية للاستعلام، مثل مجموع الأصوات.
//       //   عبارة شرطية لتحقق في بداية انو votesForOneList[0] تحتوي على قيمة عددية
//       // القسم التاني من العبارة الشرطية هو اخد هاي القيمة وحطها بالمصفوفة بدل ال 0
//       // القسم الثالث انو اذا ما في قيمة اعطيها قيمة صفر

//       const total_votesForOneLIst = votesForOneList[0]
//         ? votesForOneList[0].total_votesForOneLIst
//         : 0;
//       console.log(`Total votes: ${total_votesForOneLIst}`);
//       return total_votesForOneLIst;
//       // -------------------- total result end ---------------------
//     } catch (err) {
//       console.error("Error getting vote count:", err);
//       throw err;
//     }
//   }
//   // ========================= End  Votes For One List =========================

//   // _____________________________________________________________________________________________________________________________________________

//   // ======================= Start Votes For All Lists In One District ===========================
//   // --------- حساب عدد اصوات القوائم الموجودين داخل في دائرة معينة ---------
//   // ________________________________

//   static async getVotesForAllListsInOneDistrict(districtId) {
//     try {
//       console.log(`Calculating total vote count for districtId: ${districtId}`);

//       const votesForAllList = await knex("lists")
//         .where("district_id", districtId)
//         .sum("vote_count as total_votesForAllList");

//       console.log("Query result:", votesForAllList);
//       // -------------------- total result start ---------------------
//       const total_votesForAllList = votesForAllList[0]
//         ? votesForAllList[0].total_votesForAllList
//         : 0;
//       console.log(
//         `Total votes for district ${districtId}: ${total_votesForAllList}`
//       );

//       return total_votesForAllList;
//       // -------------------- total result end ---------------------
//     } catch (err) {
//       console.error("Error getting total vote count by district:", err);
//       throw err;
//     }
//   }
//   // ========================= End Votes For All Lists In One District =========================
// }

// module.exports = LocalListCount;



// src/models/LocalListCount.js
const knex = require('../config/db'); // تأكد من المسار الصحيح

class LocalListCount {
  static async getVotesForAllListsInDistrict(districtId) {
    try {



      
      return await knex("lists")
        .where("district_id", districtId) 
        .select("list_name", "vote_count");
    } catch (err) {
      console.error("Error querying database:", err);
      throw err;
    }
  }
  // ----------------------
  static async getNumberOfSeats(districtId) {
    try {
      const result = await knex("districts")
        .where("district_id", districtId)
        .select("number_of_seats")
        .first();

      if (result) {
        return result.number_of_seats;
      } else {
        throw new Error(`District with ID ${districtId} not found`);
      }
    } catch (error) {
      console.error(`Error fetching number of seats: ${error.message}`);
      throw error;
    }
  }
}

module.exports = LocalListCount;

