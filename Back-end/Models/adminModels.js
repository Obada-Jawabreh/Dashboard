//

const knex = require("../config/db");
const bcrypt = require("bcryptjs");

class Admin {
  static async createUser(email, password) {
    try {
      console.log("Starting user creation process...");
      console.log("Hashing password");
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("Password hashed successfully");

      console.log("Inserting user into database");
      const [newUser] = await knex("admin")
        .insert({
          email,
          password: hashedPassword,
        })
        .returning(["id", "email"]);

      console.log("User inserted successfully:", newUser);
      return newUser;
    } catch (err) {
      console.error("Error creating user:", err);
      throw err;
    }
  }

  static async findByEmail(email) {
    try {
      console.log("Searching for user by email:", email);
      const [user] = await knex("admin").where({ email });
      console.log("User found:", user ? "Yes" : "No");
      return user;
    } catch (err) {
      console.error("Error finding user by email:", err);
      throw err;
    }
  }
}

module.exports = Admin;