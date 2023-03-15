const mysql = require("mysql2");
const CLI = require("./lib/CLI");
const cli = new CLI();
cli.run();

// const db = mysql.createConnection(
//   {
//     host: "127.0.0.1",
//     user: "root",
//     password: "root",
//     database: "employees_db",
//   },
//   console.log(`Connected to the employees_db database.`)
// );

// db.query("SELECT * FROM department", function (err, results) {
//   //   console.log(results);
//   return results;
// });
