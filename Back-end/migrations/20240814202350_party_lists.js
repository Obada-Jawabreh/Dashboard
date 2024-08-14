/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('party_lists', function(table) {
        table.increments('party_list_id').primary(); // Primary key
        table.string('party_name').notNullable(); // Party name
        table.integer('vote_count').defaultTo(0); // Vote count
        table.timestamps(true, true); // Created at and updated at timestamps
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('party_lists');
};