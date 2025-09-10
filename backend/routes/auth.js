const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_this";

// In-memory user store (temporary for testing). Each user: { id, name, email, passwordHash, role }
const users = [];

// helper function
function findUserByEmail(email) {
  return users.find(
    (u) => u.email.toLowerCase() === String(email).toLowerCase()
  );
}

// ----------------- REGISTER -----------------
router.post("/register", (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // basic validation
    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ error: "name, email, password and role are required" });
    }
    if (!["student", "mentor", "admin"].includes(role)) {
      return res
        .status(400)
        .json({ error: "role must be student | mentor | admin" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "password must be at least 8 characters" });
    }
    if (findUserByEmail(email)) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    const id = users.length + 1;
    const user = { id, name, email, passwordHash, role, createdAt: new Date() };
    users.push(user);

    // create a JWT token (expires in 1 hour)
    const token = jwt.sign({ userId: id, role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return user info and token (do not return passwordHash)
    return res.status(201).json({ id, name, email, role, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

// ----------------- LOGIN -----------------
router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "email and password required" });

    const user = findUserByEmail(email);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = bcrypt.compareSync(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
