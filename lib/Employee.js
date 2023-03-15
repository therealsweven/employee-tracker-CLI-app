const inquirer = require("inquirer");
let employeesFL = ["none"];
let roles = [];
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
    db.query("SELECT * FROM employee", function (err, results) {
      results.forEach((element) =>
        employeesFL.push(element.first_name + " " + element.last_name)
      );
      return;
    });
    db.query("SELECT * FROM role", function (err, results) {
      results.forEach((element) => roles.push(element.title));
      return;
    });

    console.log(employeesFL);
    console.log(roles);
    // ask for info about role to add
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the employee's first name?",
          name: "firstName",
        },
        {
          type: "input",
          message: "What is the employee's last name?",
          name: "lastName",
        },
        {
          type: "list",
          message: "What is the employee's role?",
          choices: roles,
          name: "role",
        },
        {
          type: "list",
          message: "Who is the employees manager?",
          choices: employeesFL,
          name: "boss",
        },
      ])
      .then((response) => {
        const role_id = roles.indexOf(response.role) + 1;
        let manager_id = `null`;
        if (response.boss !== "none") {
          manager_id = employeesFL.indexOf(response.boss);
        }
        // add employee to database
        db.query(
          `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${response.firstName}","${response.lastName}",${role_id},${manager_id});`,
          function () {
            console.log(
              `Added ${response.firstName} ${response.lastName} to the database`
            );
            return;
          }
        );
      });
    return;
  }
  update(db) {
    employeesFL = [];
    db.promise()
      .query("SELECT * FROM employee")
      .then(([results, err]) => {
        // console.log(results);
        results.forEach((element) =>
          employeesFL.push(element.first_name + " " + element.last_name)
        );
        console.log(employeesFL);
        return employeesFL;
      });
    db.promise()
      .query("SELECT * FROM role")
      .then(([results, err]) => {
        results.forEach((element) => roles.push(element.title));
        return;
      });

    // db.query("SELECT * FROM employee", function (err, results) {
    //   results.forEach((element) =>
    //     employeesFL.push(element.first_name + " " + element.last_name)
    //   );
    //   return;
    // });
    // db.query("SELECT * FROM role", function (err, results) {
    //   results.forEach((element) => roles.push(element.title));
    //   return;
    // });
    // ask for info about role to add
    console.log(employeesFL);
    // console.log(roles);
    inquirer
      .prompt([
        {
          type: "list",
          message: "Which employee's role do you want to update?",
          choices: employeesFL,
          name: "name",
        },
        {
          type: "list",
          message: "What is the selected employee's new role?",
          choices: roles,
          name: "role",
        },
      ])
      .then((response) => {
        const role_id = roles.indexOf(response.role) + 1;
        const employee_id = employeesFL.indexOf(response.name) + 1;

        // update employee role in database
        db.query(
          `UPDATE employee SET role_id = ${role_id} WHERE id = ${employee_id}`,
          function () {
            console.log(
              `Updated ${response.name}'s role to ${response.role} in the database`
            );
            return;
          }
        );
      });
    return;
  }
}
module.exports = Employee;
