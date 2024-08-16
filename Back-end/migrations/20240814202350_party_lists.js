exports.up = function (knex) {
  return knex.schema.createTable("party_lists", function (table) {
    table.increments("party_list_id").primary(); // Primary key
    table.string("national_id").notNullable();
    table.string("party_name").notNullable(); // Party name
    table.integer("vote_count").defaultTo(0); // Vote count
    table.boolean("pass").defaultTo(false); 
    table.string("logo"); // Column for the logo
    table.timestamps(true, true); // Created at and updated at timestamps

    table
      .foreign("national_id")
      .references("national_id")
      .inTable("citizens")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("party_lists");
};
