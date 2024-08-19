exports.up = function (knex) {
  return knex.schema.createTable("candidates_local", function (table) {
    table.string("national_id").notNullable(); // الرقم الوطني كـ string وغير قابل للنول
    table.integer("list_id").unsigned().notNullable(); // Foreign key for list_id
    table.integer("district_id").unsigned().notNullable(); // District name
    table.integer("vote_count").defaultTo(0); // Vote count
    table.boolean("activation").defaultTo(null); // Activation status
    table.timestamps(true, true); // Created at and updated at timestamps

    table
      .foreign("national_id")
      .references("national_id")
      .inTable("citizens")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .foreign("list_id")
      .references("list_id")
      .inTable("lists")
      .onDelete("CASCADE")
      .onUpdate("CASCADE"); // Reference to the lists table
    table
      .foreign("district_id")
      .references("district_id")
      .inTable("districts")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table.primary(["national_id", "list_id", "district_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("candidates_local");
};
