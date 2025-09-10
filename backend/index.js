require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// mount auth routes
const authRouter = require("./routes/auth");
app.use("/api/auth", authRouter);

// public health check
app.get("/", (req, res) => {
  res.json({ message: "Mini Incubator backend is running 🚀" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
const authMiddleware = require("./middleware/auth");

// Example protected route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: `Hello user ${req.user.userId}, role: ${req.user.role}`,
  });
});
