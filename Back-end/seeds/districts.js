exports.seed = function (knex) {
  return knex("districts")
    .del()
    .then(function () {
      // Reset the auto-increment value (sequence)
      return knex.raw('ALTER SEQUENCE districts_district_id_seq RESTART WITH 1');
    })
    .then(function () {
      return knex("districts").insert([
        {
          district_name: "عمان الأولى",
          governorate: "عمان",
          number_of_seats: 8,
        },
        {
          district_name: "عمان الثانية",
          governorate: "عمان",
          number_of_seats: 8,
        },
        {
          district_name: "عمان الثالثة",
          governorate: "عمان",
          number_of_seats: 8,
        },
        {
          district_name: "إربد الأولى",
          governorate: "إربد",
          number_of_seats: 10,
        },
        {
          district_name: "إربد الثانية",
          governorate: "إربد",
          number_of_seats: 10,
        },
        {
          district_name: "الزرقاء",
          governorate: "الزرقاء",
          number_of_seats: 10,
        },
        { district_name: "جرش", governorate: "جرش", number_of_seats: 6 },
        { district_name: "عجلون", governorate: "عجلون", number_of_seats: 6 },
        {
          district_name: "البلقاء",
          governorate: "البلقاء",
          number_of_seats: 7,
        },
        { district_name: "الكرك", governorate: "الكرك", number_of_seats: 6 },
        { district_name: "معان", governorate: "معان", number_of_seats: 4 },
        {
          district_name: "الطفيلة",
          governorate: "الطفيلة",
          number_of_seats: 4,
        },
        { district_name: "مادبا", governorate: "مادبا", number_of_seats: 5 },
        { district_name: "المفرق", governorate: "المفرق", number_of_seats: 5 },
        { district_name: "العقبة", governorate: "العقبة", number_of_seats: 3 },
        { district_name: "الرمثا", governorate: "الرمثا", number_of_seats: 5 },
        {
          district_name: "الأغوار الشمالية",
          governorate: "الأغوار الشمالية",
          number_of_seats: 4,
        },
        {
          district_name: "الأغوار الجنوبية",
          governorate: "الأغوار الجنوبية",
          number_of_seats: 3,
        },
      ]);
    });
};
