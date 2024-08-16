const express = require("express");
const cors = require("cors");
require("dotenv").config();
const knex = require("./config/db");
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log("Starting server initialization...");
console.log("Middleware set up completed");
console.log("Database configuration:", knex.client.config.connection);
// ------- adminRoutes -------
const adminRoutes = require("./Routes/adminRoutes");
app.use("/api/admin", adminRoutes);
// -------- citizensRoutes --------
const citizensRoutes = require("./Routes/citizensRoutes");
app.use("/api/citizens", citizensRoutes);
// ------------------------
const localRoutes = require("./Routes/localRoutes");
app.use("/api/VoteCount/localList", localRoutes);
// ------------------------

console.log("Routes initialized");

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
