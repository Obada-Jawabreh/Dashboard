const knex = require("knex")(require("../knexfile").development);

exports.UserAddMessage = async (req, res) => {
  const { UserMessage } = req.body;
  try {
    await knex("chat").insert({
      CN_Id: "1",
      Message: UserMessage,
      admin: false,
      Deleted: false,
    });
    res.status(201).json({ message: "تمت إضافة رسالة بنجاح!" });
  } catch (error) {
    res.status(500).json({ error: "حدث خطأ أثناء إرسال الرسالة." });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const Messages = await knex("ChatMessages").select("*").where({
      Deleted: false,
    });
    res.status(200).json(Messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "حدث خطأ أثناء جلب الرسائل." });
  }
};
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