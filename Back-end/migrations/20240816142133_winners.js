exports.up = function (knex) {
  return knex.schema.createTable("winners", function (table) {
    table.string("Candidate_ID").primary().unsigned(); // معرف الفائز
    table.integer("list_id").unsigned();
    table.integer("district_id").unsigned();
    table.integer("party_list_id").unsigned();
    table.enu("Winning_Type", ["local", "Party List"]).notNullable(); // نوع الفوز

    table
      .foreign("Candidate_ID")
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
    table
      .foreign("party_list_id")
      .references("party_list_id")
      .inTable("party_lists")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("winners");
};
