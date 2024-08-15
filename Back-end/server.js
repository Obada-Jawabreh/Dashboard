const express = require("express");
const cors = require("cors");
require("dotenv").config();
const knex = require("./config/db");

const app = express();
const port = 5000;

console.log("Starting server initialization...");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log("Middleware set up completed");

console.log("Database configuration:", knex.client.config.connection);

const adminRoutes = require("./Routes/adminRoutes");
app.use("/api/admin", adminRoutes);

console.log("Routes initialized");

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
