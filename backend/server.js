const express = require("express");
const cors = require("cors");

const app = express();
const db = require("./database");

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});