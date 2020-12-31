const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "167.99.7.161",
  user: "root",
  password: "misha777",
  database: "admin_data",
  // host: "localhost",
  // user: "root",
  // database: "citizens",
  //This shouldn't be here but tis mine and tis IP restricted so...
});

module.exports = pool.promise();
