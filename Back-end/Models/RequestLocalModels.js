const knex = require("../config/db");

class RequestLocal {
  static async GetLocal() {
    try {
      const result = await knex("lists")
        .join(
          "candidates_local",
          "lists.list_id",
          "=",
          "candidates_local.list_id"
        )
        .select(
          "candidates_local.national_id",
          "lists.list_id",
          "lists.list_name",
          "lists.district_id",
          "lists.logo",
          "lists.activation as list_activation",
          "candidates_local.activation as candidate_activation",
          "lists.vote_count as list_vote_count",
          "candidates_local.vote_count as candidate_vote_count",
          "lists.created_at as list_created_at",
          "candidates_local.created_at as candidate_created_at",
          "lists.updated_at as list_updated_at",
          "candidates_local.updated_at as candidate_updated_at"
        );

      return result;
    } catch (error) {
      console.error("Error Get Lists:", error);
      throw error;
    }
  }
  // --------------------------------------GetDataCitizens------------------------------------

  static async GetCitizens(national_id) {
    try {
      return await knex("candidates_local")
        .join(
          "citizens",
          "candidates_local.national_id",
          "citizens.national_id"
        )
        .where("candidates_local.national_id", national_id)
        .select(
          "citizens.name",
          "candidates_local.vote_count",
          "candidates_local.activation"
        );
    } catch (error) {
      throw new Error(`Error Get candidates: ${error.message}`);
    }
  }

  // ---------------------------------Edit the activation true عشان اذذا ترو بكون ترشح-----------------------------------------
  static async EditListT(listId) {
    try {
      await knex("lists")
        .where({ list_id: listId })
        .update({ activation: true });

      console.log("List updated successfully , coach rwan");
    } catch (error) {
      console.error("Error updating list:", error);
    }
  }
// -----
  static async EditListF(listId) {
    try {
      await knex("lists")
        .where({ list_id: listId })
        .update({ activation: false });

      console.log("List updated successfully");
    } catch (error) {
      console.error("Error updating list:", error);
    }
  }
}

module.exports = RequestLocal;
