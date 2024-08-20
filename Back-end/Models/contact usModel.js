const knex = require("../config/db");

const getAllQueries = async () => {
  return knex('contact_us').select('*');
};

module.exports = {
  getAllQueries,
};
