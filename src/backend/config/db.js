const mysql = require("mysql2");

// Load environment variables for local development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Support both standard format (MYSQL_HOST) and Railway format (MYSQLHOST)
// Priority: Environment variables > Local defaults
const db = mysql.createPool({
  host: process.env.MYSQL_HOST || process.env.MYSQLHOST || "localhost",
  user: process.env.MYSQL_USER || process.env.MYSQLUSER || "root",
  password: process.env.MYSQL_PASSWORD || process.env.MYSQLPASSWORD || "",
  database: process.env.MYSQL_DATABASE || process.env.MYSQLDATABASE || "bitotri",
  port: parseInt(process.env.MYSQL_PORT || process.env.MYSQLPORT || "3306"),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection on startup
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
    console.error("Current config:", {
      host: process.env.MYSQL_HOST || process.env.MYSQLHOST || "localhost",
      user: process.env.MYSQL_USER || process.env.MYSQLUSER || "root",
      database: process.env.MYSQL_DATABASE || process.env.MYSQLDATABASE || "bitotri",
      port: process.env.MYSQL_PORT || process.env.MYSQLPORT || 3306
    });
    console.error("\nFor local development, ensure:");
    console.error("  1. MySQL is running (XAMPP/WAMP)");
    console.error("  2. Database 'bitotri' exists");
    console.error("  3. .env file in src/backend/ has correct credentials (optional)");
  } else {
    console.log("✅ Database connected successfully");
    console.log(`   Host: ${connection.config.host}`);
    console.log(`   Database: ${connection.config.database}`);
    connection.release();
  }
});

module.exports = db;
