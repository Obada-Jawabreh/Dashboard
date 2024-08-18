const knex = require("../config/db");

class Electios {
  static async GetElectios() {
    try {
      const result = await knex("elections").select("*");
      return result;
    } catch (error) {
      console.error("Error Get election:", error);
      throw error;
    }
  }

  // -------------------------------post------------------------------------------------------
  static async PostElectios(
    electionName,
    electoralDistrict,
    electoralLists,
    startDate,
    endDate,
    status,
    electionType
  ) {
    try {
      const [id] = await knex("elections")
        .insert({
          Election_Name: electionName,
          Electoral_District: electoralDistrict,
          Electoral_Lists: electoralLists,
          Start_Date: startDate,
          End_Date: endDate,
          Status: status,
          percentage_Voters: 0,
          Winning_List: null,
          Election_Type: electionType,
        })
        .returning("Election_ID");

      return {
        success: true,
        message: "Election added successfully",
        data: {
          id: id,
        },
      };
    } catch (error) {
      console.error("Error inserting election:", error);
      return {
        success: false,
        message: "Error adding election",
        error: error.message,
      };
    }
  }

  // -------------------------------update------------------------------------------------------
  static async updateElection(electionID, updates) {
    try {
      const result = await knex("elections")
        .where({ Election_ID: electionID })
        .update(updates);

      return {
        success: true,
        message: "Election updated successfully",
        data: result,
      };
    } catch (error) {
      console.error("Error updating election:", error);
      return {
        success: false,
        message: "Error updating election",
        error: error.message,
      };
    }
  }

  // -------------------------------delete------------------------------------------------------
  static async deleteElection(electionID) {
    try {
      const result = await knex("elections")
        .where({ Election_ID: electionID })
        .del();

      return {
        success: true,
        message: "Election delete successfully",
        data: result,
      };
    } catch (error) {
      console.error("Error delete election:", error);
      return {
        success: false,
        message: "Error delete election",
        error: error.message,
      };
    }
  }
}

module.exports = Electios;
