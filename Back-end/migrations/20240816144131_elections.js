exports.up = function (knex) {
  return knex.schema.createTable("elections", function (table) {
    table.increments("Election_ID").primary();
    table.string("Election_Name").notNullable(); // اسم الانتخابات
    table.string("Electoral_District"); // الدائرة الانتخابية
    table.string("Electoral_Lists"); // القائمة الانتخابية
    table.timestamp("Start_Date").notNullable(); // تاريخ ووقت البدء
    table.timestamp("End_Date").notNullable(); // تاريخ ووقت الانتهاء
    table
      .enu("Status", ["Pending", "Ongoing", "Completed"])
      .defaultTo("Pending"); // الحالة
    table.decimal("percentage_Voters", 5, 2).defaultTo(0); // إجمالي الناخبين
    table.string("Winning_List"); // القائمة الفائزة
    table.enu("Election_Type", ["Local", "Party"]); // نوع الانتخابات
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("elections");
};
