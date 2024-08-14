

//جدول القوائم المحلية 
//جدول القوائم الحزبيةاسمه party_lists

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('lists', function(table) {
        table.increments('list_id').primary(); // Primary key
        table.string('list_name').notNullable(); // List name
        table.integer('district_id').unsigned().notNullable() // Foreign key for district_id
        table.integer('vote_count').defaultTo(0); // Vote count
        table.timestamps(true, true); // Created at and updated at timestamps

        table
        .foreign("district_id")
        .references("district_id")
        .inTable("districts")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('lists');
};
