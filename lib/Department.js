const inquirer = require("inquirer");
const cTable = require("console.table");
// const Main = require("./MainMenu");
// const main = new Main();

class Department {
  constructor() {}
  display(db) {
    db.query("SELECT * FROM department", function (err, results) {
      console.table(results);
      return results;
    }).then(() => {
      // main.run();
    });
    return;
  }
  add(db) {
    // ask what department name to add
    inquirer
      .prompt({
        type: "input",
        message:
          "Please type the name of the department that you would like to add:",
        name: "dept",
      })
      .then((response) => {
        // add department to database
        db.query(
          `INSERT INTO department (name) VALUES ("${response.dept}");`,
          function () {
            return;
          }
        );
      })
      .then(() => {
        main.run();
      });
    return;
  }
  remove(db) {}
}
module.exports = Department;
