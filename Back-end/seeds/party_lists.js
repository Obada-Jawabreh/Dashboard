exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("party_lists")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("party_lists").insert([
        {
          national_id: "1635109387", // Replace with actual national ID
          party_name: "الشورى الأردني",
          vote_count: 150,
          pass: true,
          logo: "الشورى الأردني",
        },
        {
          national_id: "9085144102", // Replace with actual national ID
          party_name: "الشورى الأردني",
          vote_count: 150,
          pass: true,
          logo: "الشورى الأردني",
        },
        {
          national_id: "4592037154", // Replace with actual national ID
          party_name: "الميثاق",
          vote_count: 250,
          pass: false,
          logo: "الميثاق",
        },
        {
          national_id: "8164329087", // Replace with actual national ID
          party_name: "الوفاء الوطني",
          vote_count: 70,
          pass: true,
          logo: "الوفاء الوطني",
        },
        {
          national_id: "5749268130", // Replace with actual national ID
          party_name: "التنمية الوطني",
          vote_count: 104,
          pass: true,
          logo: " التنمية الوطني",
        },
        {
          national_id: "2870316498", // Replace with actual national ID
          party_name: "جبهة العمل ىالإسلامي",
          vote_count: 108,
          pass: true,
          logo: "جبهة العمل الإسلامي",
        },
        {
          national_id: "6325148702", // Replace with actual national ID
          party_name: "الاتحاد الوطني",
          vote_count: 93,
          pass: false,
          logo: "الاتحاد الوطني",
        },
        {
          national_id: "1148179138", // Replace with actual national ID
          party_name: "البناء الوطني",
          vote_count: 84,
          pass: true,
          logo: "البناء الوطني",
        },
        {
          national_id: "3982922675", // Replace with actual national ID
          party_name: "العدالة والإصلاح",
          vote_count: 111,
          pass: true,
          logo: "العدالة والإصلاح",
        },
      ]);
    });
};
