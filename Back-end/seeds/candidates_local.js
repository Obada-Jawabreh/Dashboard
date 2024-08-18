exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("candidates_local").del();

  // Inserts seed entries
  await knex("candidates_local").insert([
    {
      national_id: "1635109387",
      list_id: 1,
      district_id: 6,
      vote_count: 1,
      activation: false,
    },
  ]);
};