exports.up = function(knex) {
    return knex.schema.createTable('lists', function(table) {
        table.increments('list_id').primary(); // Primary key
        table.string('list_name').notNullable(); // List name
        table.integer('district_id').unsigned().notNullable(); // Foreign key for district_id
        table.integer('vote_count').defaultTo(0); // Vote count
        table.string('logo'); // Column for the logo
        table.boolean('activation').defaultTo(null); // Activation column, default to null
        table.enu('status', ['Accepted', 'Rejected', 'Pending']).defaultTo('Pending'); // Status column, default to 'Pending'
        table.timestamps(true, true); // Created at and updated at timestamps

        table
            .foreign('district_id')
            .references('district_id')
            .inTable('districts')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    }).then(() => {
        // Create trigger function to update status based on activation
        return knex.raw(`
            CREATE OR REPLACE FUNCTION update_status_based_on_activation()
            RETURNS TRIGGER AS $$
            BEGIN
                IF NEW.activation IS NULL THEN
                    NEW.status := 'Pending';
                ELSIF NEW.activation = true THEN
                    NEW.status := 'Accepted';
                ELSE
                    NEW.status := 'Rejected';
                END IF;
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);
    }).then(() => {
        // Attach the trigger to the lists table
        return knex.raw(`
            CREATE TRIGGER activation_trigger
            BEFORE INSERT OR UPDATE ON lists
            FOR EACH ROW
            EXECUTE FUNCTION update_status_based_on_activation();
        `);
    }).then(() => {
        // Create trigger function to update activation in candidates_local based on lists
        return knex.raw(`
            CREATE OR REPLACE FUNCTION update_candidates_local_activation()
            RETURNS TRIGGER AS $$
            BEGIN
                UPDATE candidates_local
                SET activation = NEW.activation
                WHERE list_id = NEW.list_id;
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);
    }).then(() => {
        // Attach the trigger to the lists table to update candidates_local
        return knex.raw(`
            CREATE TRIGGER candidates_activation_trigger
            AFTER UPDATE ON lists
            FOR EACH ROW
            EXECUTE FUNCTION update_candidates_local_activation();
        `);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('lists')
        .then(() => knex.raw('DROP FUNCTION IF EXISTS update_status_based_on_activation() CASCADE'))
        .then(() => knex.raw('DROP FUNCTION IF EXISTS update_candidates_local_activation() CASCADE'))
        .then(() => knex.raw('DROP TRIGGER IF EXISTS activation_trigger ON lists'))
        .then(() => knex.raw('DROP TRIGGER IF EXISTS candidates_activation_trigger ON lists'));
};
