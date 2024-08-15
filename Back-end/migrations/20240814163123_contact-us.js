exports.up = function (knex) {
  return knex.schema.createTable("contact_us", function (table) {
    table.increments("id").primary(); 
    table.string("national_id").notNullable()// الرقم الوطني كـ string وغير قابل للنول
    table.string("name").notNullable(); // اسم المستخدم
    table.string("email").notNullable(); // البريد الإلكتروني
    table.string("subject").notNullable(); // عنوان الرسالة
    table.text("message").notNullable(); // محتوى الرسالة
    table.timestamp("created_at").defaultTo(knex.fn.now()); // تاريخ الإنشاء

    table
      .foreign("national_id")
      .references("national_id")
      .inTable("citizens")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("contact_us");
};
