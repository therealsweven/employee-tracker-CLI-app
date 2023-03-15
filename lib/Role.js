const inquirer = require("inquirer");

class Role {
  constructor() {}
  display(db) {
    db.query("SELECT * FROM role", function (err, results) {
      console.log(results);
      return results;
    });
    return;
  }
  add(db) {
    const depts = [];
    db.query("SELECT * FROM department", function (err, results) {
      results.forEach((element) => depts.push(element.name));
      return results;
    });
    // ask for info about role to add
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the role?",
          name: "title",
        },
        {
          type: "input",
          message: "What is the salary?",
          name: "salary",
        },
        {
          type: "list",
          message: "What department does this role fall under?",
          choices: depts,
          name: "dept",
        },
      ])
      .then((response) => {
        const dept_id = depts.indexOf(response.dept) + 1;
        // add department to database
        db.query(
          `INSERT INTO role (title, salary, department_id) VALUES ("${response.title}","${response.salary}","${dept_id}");`,
          function () {
            return;
          }
        );
      });
    return;
  }
}
module.exports = Role;
