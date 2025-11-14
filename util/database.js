require("dotenv").config();

const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  database: process.env.DB_NAME || "node-complete",
  password: process.env.DB_PASSWORD,
});

const promisePool = pool.promise();

// Test database connection on startup
promisePool.query('SELECT 1')
  .then(() => console.log('✅ Database connected successfully'))
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
    console.error('Please check your database configuration in .env file');
  });

module.exports = promisePool;
