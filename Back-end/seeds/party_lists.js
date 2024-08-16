exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("party_lists")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("party_lists").insert([
        {
          national_id: "1635109387", // Replace with actual national ID
          party_name: "Green Party",
          vote_count: 150,
          pass: true,
          logo: "green-party-logo.png",
        },
        {
          national_id: "4592037154", // Replace with actual national ID
          party_name: "Red Party",
          vote_count: 250,
          pass: false,
          logo: "red-party-logo.png",
        },
        {
          national_id: "8164329087", // Replace with actual national ID
          party_name: "Blue Party",
          vote_count: 100,
          pass: true,
          logo: "blue-party-logo.png",
        },
      ]);
    });
};
