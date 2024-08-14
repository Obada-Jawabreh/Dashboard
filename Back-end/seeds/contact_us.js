exports.seed = function (knex) {
  return knex("contact_us")
    .del()
    .then(function () {
      return knex("contact_us").insert([
        {
          national_id: "1148179138",
          name: "أحمد يوسف",
          email: "ahmed.yusuf@example.com",
          subject: "استفسار عن الانتخابات",
          message:
            "أريد معرفة المزيد عن كيفية التسجيل للانتخابات القادمة ومكان الإقتراع.",
          created_at: knex.fn.now(),
        },
        {
          national_id: "3982922675",
          name: "سارة محمد",
          email: "sara.mohammed@example.com",
          subject: "اعتراض على نتائج الانتخابات",
          message:
            "لدي اعتراض حول نتائج الانتخابات في دائرتي الانتخابية. أريد معرفة كيفية تقديم شكوى رسمية.",
          created_at: knex.fn.now(),
        },
        {
          national_id: "2961866183",
          name: "محمود علي",
          email: "mahmoud.ali@example.com",
          subject: "تغيير مكان الاقتراع",
          message:
            "أرغب في تغيير مكان الاقتراع الخاص بي إلى دائرة أخرى. ما هي الخطوات المطلوبة؟",
          created_at: knex.fn.now(),
        },
      ]);
    });
};
