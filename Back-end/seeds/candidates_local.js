exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("candidates_local").del();

  // Inserts seed entries
  await knex("candidates_local").insert([
    {
      national_id: "1635109387",
      list_id: 1, // تأكد من وجود هذا الـ list_id في جدول `lists`
      district_id: 6, // تأكد من وجود هذا الـ district_id في جدول `districts`
      vote_count: 0,
    },
    {
      national_id: "4592037154",
      list_id: 4,
      district_id: 6,
      vote_count: 0,
    },
    {
      national_id: "8164329087",
      list_id: 6,
      district_id: 6,
      vote_count: 0,
    },
    {
      national_id: "5749268130",
      list_id: 9,
      district_id: 6,
      vote_count: 0,
    },
    {
      national_id: "2870316498",
      list_id: 11,
      district_id: 6,
      vote_count: 0,
    },
    {
      national_id: "6325148702",
      list_id: 13,
      district_id: 6,
      vote_count: 0,
    },
    {
      national_id: "1148179138",
      list_id: 2,
      district_id: 1,
      vote_count: 0,
    },
    {
      national_id: "3982922675",
      list_id: 6,
      district_id: 1,
      vote_count: 0,
    },
    {
      national_id: "9085144102",
      list_id: 10,
      district_id: 1,
      vote_count: 0,
    },
    {
      national_id: "7174989888",
      list_id: 12,
      district_id: 3,
      vote_count: 0,
    },
    {
      national_id: "6906327616",
      list_id: 15,
      district_id: 3,
      vote_count: 0,
    },
    {
      national_id: "8102055000",
      list_id: 17,
      district_id: 3,
      vote_count: 0,
    },
    {
      national_id: "7655308212",
      list_id: 18,
      district_id: 6,
      vote_count: 0,
    },
    {
      national_id: "2732804342",
      list_id: 21,
      district_id: 6,
      vote_count: 0,
    },
    {
      national_id: "9763602687",
      list_id: 24,
      district_id: 6,
      vote_count: 0,
    },
    {
      national_id: "2485273807",
      list_id: 27,
      district_id: 6,
      vote_count: 0,
    },
    {
      national_id: "4760633483",
      list_id: 30,
      district_id: 6,
      vote_count: 0,
    },
    {
      national_id: "4748932096",
      list_id: 33,
      district_id: 6,
      vote_count: 0,
    },
    {
      national_id: "1406991627",
      list_id: 36,
      district_id: 6,
      vote_count: 0,
    },
    {
      national_id: "9732422972",
      list_id: 39,
      district_id: 6,
      vote_count: 0,
    },
    {
      national_id: "7978975300",
      list_id: 42,
      district_id: 6,
      vote_count: 0,
    },
    {
      national_id: "4278883896",
      list_id: 45,
      district_id: 6,
      vote_count: 0,
    },
    {
      national_id: "5788961262",
      list_id: 48,
      district_id: 6,
      vote_count: 0,
    },
    {
      national_id: "6520719287",
      list_id: 51,
      district_id: 6,
      vote_count: 0,
    },
  ]);
};
