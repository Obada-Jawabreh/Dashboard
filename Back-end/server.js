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
const electionsRoutes = require("./Routes/electionsRoutes");
const chatRoutes = require("./Routes/chatRoutes");
app.use("/api/citizens", citizensRoutes);
app.use("/api/elections", electionsRoutes);
app.use("/api/chat", chatRoutes);

// -------- localRoutes ------------
const localRoutes = require("./Routes/localRoutes");
app.use("/api/VoteCount/localList", localRoutes);
// ------------ partyRoutes ------------
const partyRoutes = require("./Routes/partyRoutes");
app.use("/api/VoteCount/partyList", partyRoutes);

console.log("Routes initialized");

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
