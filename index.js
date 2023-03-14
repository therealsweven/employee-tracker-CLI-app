const mysql = require("mysql2");
const CLI = require("./lib/CLI");
const cli = new CLI();
cli.run();

const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);

db.query("SELECT * FROM department", function (err, results) {
  //   console.log(results);
  return results;
});

console.log(deptdata);

// db.query("SELECT * FROM role", function (err, results) {
//   //   console.log(results);
// });
// db.query("SELECT * FROM employee", function (err, results) {
//   //   console.log(results);
// });
