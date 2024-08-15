/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("districts", function (table) {
    table.increments("district_id").primary(); // Primary key
    table.string("district_name").notNullable(); // District name
    table.string("governorate").notNullable(); // Governorate
    table.integer("number_of_seats").notNullable(); // Number of seats
    table.integer("numOfCandidat").defaultTo(0);
    table.timestamps(true, true); // Created at and updated at timestamps
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("districts");
};
