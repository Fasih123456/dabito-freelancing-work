const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "dabito",
  password: "fasih123",
});

module.exports = pool.promise();
