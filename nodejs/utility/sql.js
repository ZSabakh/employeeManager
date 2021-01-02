const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  // host: "localhost",
  // user: "root",
  // database: "citizens",
  //This shouldn't be here but tis mine and tis IP restricted so...
});

module.exports = pool.promise();
