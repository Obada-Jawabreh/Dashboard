exports.seed = async function (knex) {
  return (
    knex("lists")
      .del()
      .then(function () {
        // Reset the auto-increment value (sequence)
        return knex.raw("ALTER SEQUENCE lists_list_id_seq RESTART WITH 1");
      })
      // ---------------------------
      .then(function () {
        return knex("lists").insert([
          {
            list_name: "الإصلاح الوطني",
            district_id: 1,
            vote_count: 20,
            logo: "التحالف الوطني للاصلاح - كرامة مواطن حماية وطن",
          },
          {
            list_name: "قائمة الأمل",
            district_id: 2,
            vote_count: 0,
            logo: "الأمل من أجل التغيير",
          },
          {
            list_name: "قائمة التضامن",
            district_id: 3,
            vote_count: 0,
            logo: "معًا نحو مستقبل أفضل",
          },
          {
            list_name: "قائمة العدالة",
            district_id: 1,
            vote_count: 14,
            logo: "العدالة هي الأساس",
          },
          {
            list_name: "قائمة النجاح",
            district_id: 2,
            vote_count: 0,
            logo: "نحو مستقبل مشرق",
          },
          {
            list_name: "قائمة الحرية",
            district_id: 1,
            vote_count: 4,
            logo: "حرية الاختيار حق للجميع",
          },
          {
            list_name: "قائمة الطموح",
            district_id: 3,
            vote_count: 0,
            logo: "نحو مستقبل أفضل للجميع",
          },
          {
            list_name: "قائمة التطوير",
            district_id: 2,
            vote_count: 0,
            logo: "تطوير الاقتصاد والمجتمع",
          },
          {
            list_name: "قائمة الازدهار",
            district_id: 3,
            vote_count: 0,
            logo: "معًا نحو الازدهار",
          },
          {
            list_name: "قائمة الوحدة",
            district_id: 1,
            vote_count: 8,
            logo: "الوحدة قوة",
          },
          {
            list_name: "قائمة الاستقرار",
            district_id: 2,
            vote_count: 0,
            logo: "استقرار الوطن هو الأولوية",
          },
          {
            list_name: "قائمة العمل",
            district_id: 3,
            vote_count: 0,
            logo: "العمل الجاد من أجل مستقبل مشرق",
          },
          {
            list_name: "قائمة الكرامة",
            district_id: 1,
            vote_count: 7,
            logo: "كرامة المواطن حق مشروع",
          },
          {
            list_name: "قائمة الأمان",
            district_id: 2,
            vote_count: 0,
            logo: "الأمان للجميع",
          },
          {
            list_name: "قائمة الأمل الجديد",
            district_id: 3,
            vote_count: 0,
            logo: "مستقبل جديد",
          },
          {
            list_name: "قائمة الشجاعة",
            district_id: 1,
            vote_count: 8,
            logo: "الشجاعة في التغيير",
          },
          {
            list_name: "قائمة الإنجاز",
            district_id: 2,
            vote_count: 0,
            logo: "الإنجازات تتحدث",
          },
          {
            list_name: "قائمة الأفق",
            district_id: 3,
            vote_count: 0,
            logo: "نحو أفق جديد",
          },
          {
            list_name: "قائمة النهضة",
            district_id: 1,
            vote_count: 0,
            logo: "نهضة وطنية شاملة",
          },
          {
            list_name: "قائمة الإبداع",
            district_id: 2,
            vote_count: 0,
            logo: "الإبداع والابتكار",
          },
          {
            list_name: "قائمة النماء",
            district_id: 3,
            vote_count: 0,
            logo: "نمو وتقدم",
          },
          {
            list_name: "قائمة الشراكة",
            district_id: 1,
            vote_count: 0,
            logo: "شراكة مع المواطن",
          },
          {
            list_name: "قائمة الأجيال",
            district_id: 2,
            vote_count: 0,
            logo: "الأجيال القادمة",
          },
          {
            list_name: "قائمة السعادة",
            district_id: 3,
            vote_count: 0,
            logo: "السعادة للمواطنين",
          },
          {
            list_name: "قائمة الأصالة",
            district_id: 1,
            vote_count: 0,
            logo: "التمسك بالقيم",
          },
          {
            list_name: "قائمة الالتزام",
            district_id: 2,
            vote_count: 0,
            logo: "الالتزام بالوعود",
          },
          {
            list_name: "قائمة العطاء",
            district_id: 3,
            vote_count: 0,
            logo: "العطاء للمجتمع",
          },
          {
            list_name: "قائمة الرفاهية",
            district_id: 1,
            vote_count: 0,
            logo: "رفاهية للجميع",
          },
          {
            list_name: "قائمة الابتكار",
            district_id: 2,
            vote_count: 0,
            logo: "ابتكار من أجل التقدم",
          },
          {
            list_name: "قائمة الفخر",
            district_id: 3,
            vote_count: 0,
            logo: "فخر الوطن",
          },
          {
            list_name: "قائمة الريادة",
            district_id: 1,
            vote_count: 0,
            logo: "ريادة الأعمال",
          },
          {
            list_name: "قائمة الأصوات الحرة",
            district_id: 2,
            vote_count: 0,
            logo: "الصوت الحر للمواطن",
          },
          {
            list_name: "قائمة المستقبل",
            district_id: 3,
            vote_count: 0,
            logo: "مستقبل واعد",
          },
          {
            list_name: "قائمة المشاركة",
            district_id: 1,
            vote_count: 0,
            logo: "مشاركة المواطنين في القرار",
          },
          {
            list_name: "قائمة الأثر",
            district_id: 2,
            vote_count: 0,
            logo: "الأثر الإيجابي في المجتمع",
          },
          {
            list_name: "قائمة التعاون",
            district_id: 3,
            vote_count: 0,
            logo: "التعاون بين الجميع",
          },
          {
            list_name: "قائمة النضال",
            district_id: 1,
            vote_count: 0,
            logo: "النضال من أجل حقوقنا",
          },
          {
            list_name: "قائمة الوعي",
            district_id: 2,
            vote_count: 0,
            logo: "الوعي السياسي والاجتماعي",
          },
          {
            list_name: "قائمة العزم",
            district_id: 3,
            vote_count: 0,
            logo: "العزم على التغيير",
          },
          {
            list_name: "قائمة التغيير",
            district_id: 1,
            vote_count: 0,
            logo: "التغيير نحو الأفضل",
          },
          {
            list_name: "قائمة الأمل المستدام",
            district_id: 2,
            vote_count: 0,
            logo: "أمل مستدام للجميع",
          },
          {
            list_name: "قائمة التجديد",
            district_id: 3,
            vote_count: 0,
            logo: "تجديد الأفكار",
          },
          {
            list_name: "قائمة الإصلاحات",
            district_id: 1,
            vote_count: 0,
            logo: "إصلاحات جذرية",
          },
          {
            list_name: "قائمة المبادرة",
            district_id: 2,
            vote_count: 0,
            logo: "مبادرة حقيقية للتغيير",
          },
          {
            list_name: "قائمة التواصل",
            district_id: 3,
            vote_count: 0,
            logo: "التواصل مع المواطنين",
          },
          {
            list_name: "قائمة الإخاء",
            district_id: 1,
            vote_count: 0,
            logo: "الإخاء بين جميع المواطنين",
          },
          {
            list_name: "قائمة الرؤية",
            district_id: 2,
            vote_count: 0,
            logo: "رؤية للمستقبل",
          },
          {
            list_name: "قائمة التعاونيات",
            district_id: 3,
            vote_count: 0,
            logo: "التعاون من أجل التقدم",
          },
          {
            list_name: "قائمة الخطوة الأولى",
            district_id: 6,
            vote_count: 170,
            logo: "خطوة نحو الأمام",
          },
          {
            list_name: "قائمة الإنجاز المشترك",
            district_id: 6,
            vote_count: 210,
            logo: "إنجاز مشترك بين الجميع",
          },
          {
            list_name: "قائمة الحقوق",
            district_id: 6,
            vote_count: 450,
            logo: "حقوق المواطن هي الأساس",
          },
          {
            list_name: "قائمة الانتماء",
            district_id: 6,
            vote_count: 187,
            logo: "انتماء لوطننا",
          },
          {
            list_name: "قائمة التلاحم",
            district_id: 6,
            vote_count: 90,
            logo: "تلاحم المجتمع",
          },
          {
            list_name: "قائمة الجدية",
            district_id: 6,
            vote_count: 302,
            logo: "الجدية في العمل",
          },
          {
            list_name: "قائمة الأمل المباشر",
            district_id: 6,
            vote_count: 274,
            logo: "أمل مباشر لمستقبل مشرق",
          },
          {
            list_name: "قائمة الصداقة",
            district_id: 6,
            vote_count: 174,
            logo: "صداقات قوية للمجتمع",
          },
          {
            list_name: "قائمة الطموحات",
            district_id: 6,
            vote_count: 73,
            logo: "تحقيق الطموحات الوطنية",
          },
          {
            list_name: " الورقة البيضاء",
            district_id: 6,
            vote_count: 0,
            logo: " الورقة البيضاء",
          },
        ]);
      })
  );
};
