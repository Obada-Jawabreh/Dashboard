exports.seed = function (knex) {
  // ----------------------
  // كود يساعد في بداية العد من الرقم 1
  // لكن انتبه من المسميات حسب الجول والقيمة الي بدك تعدل عليها من الجدول
  return knex("party_lists")
    .del()
    .then(function () {
      // Reset the auto-increment value (sequence)
      return knex.raw(
        "ALTER SEQUENCE party_lists_party_list_id_seq RESTART WITH 1"
      );
    })
    // ---------------------------
    .then(function () {
      return knex("party_lists").insert([
        {
          national_id: "6518258652", // Replace with actual national ID
          party_name: " قائمة النهوض",
          vote_count: 192,
          pass: true,
          logo: " قائمة النهوض",
        },
        {
          national_id: "7359678775", // Replace with actual national ID
          party_name: "الوفاء الوطني",
          vote_count: 70,
          pass: true,
          logo: "الوفاء الوطني",
        },

        {
          national_id: "1635109387", // Replace with actual national ID
          party_name: "الأرض المباركة",
          vote_count: 150,
          pass: true,
          logo: "الأرض المباركة",
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
