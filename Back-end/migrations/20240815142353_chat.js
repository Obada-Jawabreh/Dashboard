exports.up = function (knex) {
  return knex.schema.createTable("chat", function (table) {
    table.increments("M_Id").primary(); // Primary Key
    table.string("national_id").notNullable();
    table.text("Message").notNullable(); // Message Content
    table.boolean("admin").notNullable(); // Boolean to check if the message is from admin
    table.boolean("Deleted").notNullable(); // Boolean to check if the message is from Deleted
    table.timestamp("timestamp").defaultTo(knex.fn.now()); // Timestamp of the message

    // Foreign Key Reference to Users table's N_Id column
    table
      .foreign("national_id")
      .references("national_id")
      .inTable("citizens")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("chat");
};
