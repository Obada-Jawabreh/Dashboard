// const knex = require("../config/db");

// class PartyListCount {
//   // ======================= Start Votes For One List ===========================
//   //   -------- حساب عدد اصوات قائمة واحدة في دائرة معينة ---------
//   static async getVotesForOnePartyList(partyName) {
//     try {
//       console.log(`Calculating vote count for partyName: ${partyName}`);

//       // استعلام للحصول على أول سجل يطابق اسم القائمة
//       const voteForFirstPartyList = await knex("party_lists")
//         .where("party_name", partyName)
//         .first() // اختيار أول سجل فقط
//         .select("vote_count"); // اختيار فقط عمود vote_count

//       console.log("Query voteForFirstPartyList:", voteForFirstPartyList);

//       // -------------------- total result start ---------------------
//       const vote_count = voteForFirstPartyList
//         ? voteForFirstPartyList.vote_count
//         : 0;
//       console.log(`Vote count: ${vote_count}`);
//       return vote_count;
//       // -------------------- total result end ---------------------
//     } catch (err) {
//       console.error("Error getting vote count:", err);
//       throw err;
//     }
//   }

//   // ========================= End  Votes For One List =========================

//   // _____________________________________________________________________________________________________________________________________________

//   // ======================= Start Votes For All party Lists  ===========================
//   // ---------حساب عدد اصوات القوائم الحزبية ---------
//   // ________________________________
//   static async getVotesForAllPartyLists() {
//     try {
//       console.log("Calculating sum of vote counts for distinct party names");

//       // استعلام للحصول على مجموع الأصوات لأول ظهور لكل اسم حزب
//       const voteCounts = await knex.raw(`
//       SELECT SUM(vote_count) AS total_votesForAllPartyList
//       FROM (
//         SELECT DISTINCT ON (party_name) party_name, vote_count
//         FROM party_lists
//         ORDER BY party_name -- تأكد من ترتيب السجلات للحصول على أول ظهور
//       ) AS distinct_party_votes
//     `);

//       console.log("Query voteCounts:", voteCounts.rows);

//       // -------------------- total result start ---------------------
//       const total_votesForAllPartyList = voteCounts.rows[0]
//         ? parseInt(voteCounts.rows[0].total_votesforallpartylist, 10) // تأكد من استخدام الاسم الصحيح
//         : 0;
//       console.log(
//         `Total votes for distinct party names: ${total_votesForAllPartyList}`
//       );
//       return total_votesForAllPartyList;
//       // -------------------- total result end ---------------------
//     } catch (err) {
//       console.error("Error getting vote count sum:", err);
//       throw err;
//     }
//   }

//   //     const voteCounts = await knex("party_lists")
//   //       .select("party_name")
//   //       .sum("vote_count as vote_count")
//   //       .groupBy("party_name");

//   //     // جمع الأصوات لجميع القوائم
//   //     const total_votesForAllPartyList = voteCounts.reduce(
//   //       (sum, item) => sum + parseInt(item.vote_count, 10),
//   //       0
//   //     );

//   //     console.log("Query voteCounts:", voteCounts);
//   //     console.log(
//   //       `Total votes for distinct party names: ${total_votesForAllPartyList}`
//   //     );

//   //     // -------------------- total result end ---------------------
//   //     return total_votesForAllPartyList;
//   //   } catch (err) {
//   //     console.error("Error getting vote count sum:", err);
//   //     throw err;
//   //   }
//   // }
// }

// module.exports = PartyListCount;



const knex = require("../config/db");

class PartyListCount {
  static async getVotesForOnePartyList(partyName) {
    try {
      const result = await knex("party_lists")
        .where("party_name", partyName)
        .first()
        .select("vote_count");
      
      return result ? result.vote_count : 0;
    } catch (err) {
      console.error("Error getting vote count for one party list:", err);
      throw err;
    }
  }

  static async getVotesForAllPartyLists() {
    try {
      const result = await knex("party_lists")
        .sum("vote_count as total_votes")
        .first();
      
      return result ? parseInt(result.total_votes, 10) : 0;
    } catch (err) {
      console.error("Error getting total vote count for all party lists:", err);
      throw err;
    }
  }

  static async getAllPartyLists() {
    try {
      return await knex("party_lists")
        .select("party_name", "vote_count");
    } catch (err) {
      console.error("Error getting all party lists:", err);
      throw err;
    }
  }
}

module.exports = PartyListCount;