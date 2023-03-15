const inquirer = require("inquirer");

class Employee {
  constructor() {}
  display(db) {
    db.query("SELECT * FROM employee", function (err, results) {
      console.log(results);
      return results;
    });
    return;
  }
  add(db) {
    return console.log("add employee");
  }
  update(db) {
    return console.log("update employee role");
  }
}
module.exports = Employee;
