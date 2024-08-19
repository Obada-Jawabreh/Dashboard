const knex = require("../config/db"); // تأكد من ضبط مسار ملف قاعدة البيانات بشكل صحيح

class Candidate {
  static async getCandidatesByDistrictAndList(districtId) {
    console.log(`Fetching candidates for district: ${districtId}`);

    try {
      const results = await knex("candidates_local")
        .join("lists", "candidates_local.list_id", "lists.list_id")
        .select(
          "candidates_local.national_id",
          "candidates_local.vote_count",
          "lists.list_name"
        )
        .where("candidates_local.district_id", districtId)
        .orderBy("candidates_local.vote_count", "desc");

      console.log(
        `Found ${results.length} candidates for district: ${districtId}`
      );
      console.log(results);
      return results;
    } catch (error) {
      console.error("Error fetching candidates by district and list:", error);
      throw error;
    }
  }

  static async getCandidatesByGenderAndReligion(districtId, gender, religion) {
    console.log(
      `Fetching candidates for district: ${districtId}, gender: ${gender}, religion: ${religion}`
    );

    try {
      const results = await knex("candidates_local")
        .join(
          "citizens",
          "candidates_local.national_id",
          "citizens.national_id"
        )
        .join("lists", "candidates_local.list_id", "lists.list_id")
        .select(
          "candidates_local.national_id",
          "citizens.name",
          "candidates_local.vote_count",
          "lists.list_name"
        )
        .where("candidates_local.district_id", districtId)
        .andWhere("citizens.gender", gender)
        .andWhere("citizens.religion", religion)
        .orderBy("candidates_local.vote_count", "desc");

      console.log(
        `Found ${results.length} candidates for district: ${districtId}, gender: ${gender}, religion: ${religion}`
      );
      console.log(results);
      return results;
    } catch (error) {
      console.error("Error fetching candidates by gender and religion:", error);
      throw error;
    }
  }

  static async getCandidatesByFemale(districtId, gender) {
    console.log(
      `Fetching candidates for district: ${districtId}, gender: ${gender}`
    );

    try {
      const results = await knex("candidates_local")
        .join(
          "citizens",
          "candidates_local.national_id",
          "citizens.national_id"
        )
        .join("lists", "candidates_local.list_id", "lists.list_id")
        .select(
          "candidates_local.national_id",
          "citizens.name",
          "candidates_local.vote_count",
          "lists.list_name"
        )
        .where("candidates_local.district_id", districtId)
        .andWhere("citizens.gender", gender)
        .orderBy("candidates_local.vote_count", "desc");

      console.log(
        `Found ${results.length} candidates for district: ${districtId}, gender: ${gender}`
      );
      console.log(results);
      return results;
    } catch (error) {
      console.error("Error fetching candidates by gender and religion:", error);
      throw error;
    }
  }
}

module.exports = Candidate;
