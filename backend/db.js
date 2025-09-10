const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root", // default XAMPP user
  password: "", // leave empty unless you set one
  database: "mini_incubator",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL Database");
  }
});

module.exports = db;
