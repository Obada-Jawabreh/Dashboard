/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("citizens", function (table) {
      table.string("national_id").primary(); // جعل national_id هو المفتاح الأساسي
      table.string("name").notNullable(); // عمود الاسم
      table.string("religion").notNullable(); // عمود الدين
      table.string("email").notNullable().unique(); // عمود البريد الإلكتروني
      table.string("governorate").notNullable(); // عمود المحافظة
      table.string("electoral_district").notNullable(); // عمود الدائرة الانتخابية
      table.string("region").notNullable(); // عمود المنطقة
      table.boolean("is_voted_party").defaultTo(false); // عمود التصويت للحزب
      table.boolean("is_voted_local").defaultTo(false); // عمود التصويت المحلي
      table.string("gender").notNullable(); // عمود الجنس
      table.integer("OTP").unique();
      table.string("passwoard");
      table.timestamps(true, true); // الطوابع الزمنية
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable("citizens");
  };

