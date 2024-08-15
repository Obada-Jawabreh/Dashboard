const knex = require("../config/db");
class Citizens {
  static async GetCitizens() {
    try {
      const allCitizens = await knex("citizens").select("*");

      return allCitizens;
    } catch (err) {
      console.error("Error getting citizens:", err);
      throw err;
    }
  }
}
module.exports=Citizens