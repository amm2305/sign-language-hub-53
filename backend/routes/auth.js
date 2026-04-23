const express = require("express");
const router = express.Router();
const db = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = "secretkey";

// 🔹 REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Register API hit", name, email);
  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword],
    function (err) {
      if (err) {
        return res.status(400).json({ error: "User already exists" });
      }
      res.json({ message: "User registered" });
    }
  );
});

// 🔹 LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ error: "Wrong password" });
    }

    db.run("UPDATE users SET lastLogin = ? WHERE id = ?", [
      new Date().toISOString(),
      user.id
    ]);

    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "1d" });

    res.json({ message: "Login successful", token, user });
  });
});

module.exports = router;
