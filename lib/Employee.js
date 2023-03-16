const inquirer = require("inquirer");
const cTable = require("console.table");
let employeesFL = ["none"];
let roles = [];
class Employee {
  constructor() {}
  async display(db) {
    await db
      .promise()
      .query(
        `SELECT e.ID, e.First_name, e.Last_name, role.Title, department.Department, role.Salary, concat(m.First_name," ",m.Last_name) AS Manager
    FROM employee e
    INNER JOIN role ON e.Role_id = role.ID
    INNER JOIN department ON role.Department_id = Department.ID
    LEFT JOIN employee m ON m .ID = e.manager_ID`
      )
      .then(async ([results, err]) => {
        await console.table(results);
        return results;
      });
    return;
  }
  async add(db) {
    //query for employee list to select manager
    await db
      .promise()
      .query("SELECT * FROM employee")
      .then(async ([results, err]) => {
        await results.forEach(
          async (element) =>
            await employeesFL.push(element.First_name + " " + element.Last_name)
        );
        return;
      });
    //query for roles for role select
    await db
      .promise()
      .query("SELECT * FROM role")
      .then(async ([results, err]) => {
        await results.forEach(
          async (element) => await roles.push(element.Title)
        );
        return;
      });

    console.log(employeesFL);
    console.log(roles);
    // ask for info about role to add
    await inquirer
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
      .then(async (response) => {
        const role_id = roles.indexOf(response.role) + 1;
        let manager_id = `null`;
        if (response.boss !== "none") {
          manager_id = employeesFL.indexOf(response.boss);
        }
        // add employee to database
        await db
          .promise()
          .query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${response.firstName}","${response.lastName}",${role_id},${manager_id});`
          )
          .then(function () {
            console.log(
              `Added ${response.firstName} ${response.lastName} to the database`
            );
            return;
          });
      });
    return;
  }
  async update(db) {
    employeesFL = [];
    await db
      .promise()
      .query("SELECT * FROM employee")
      .then(async ([results, err]) => {
        await results.forEach(
          async (element) =>
            await employeesFL.push(element.First_name + " " + element.Last_name)
        );
        return employeesFL;
      });
    await db
      .promise()
      .query("SELECT * FROM role")
      .then(async ([results, err]) => {
        await results.forEach((element) => roles.push(element.Title));
        return;
      });

    // ask for info about role to add
    // console.log(roles);
    await inquirer
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
      .then(async (response) => {
        const role_id = (await roles.indexOf(response.role)) + 1;
        const employee_id = employeesFL.indexOf(response.name) + 1;

        // update employee role in database
        await db
          .promise()
          .query(
            `UPDATE employee SET role_id = ${role_id} WHERE id = ${employee_id}`
          )
          .then(function () {
            console.log(
              `Updated ${response.name}'s role to ${response.role} in the database`
            );
            return;
          });
      });
    return;
  }

  async destroy(db) {
    await db
      .promise()
      .query("SELECT * FROM employee")
      .then(async ([results, err]) => {
        employeesFL = [];
        await results.forEach(
          async (element) =>
            await employeesFL.push(element.First_name + " " + element.Last_name)
        );
        return;
      });
    await inquirer
      .prompt([
        {
          type: "list",
          message: "Which employee would you like to delete?",
          choices: employeesFL,
          name: "employeeToDelete",
        },
      ])
      .then(async (response) => {
        await db
          .promise()
          .query(
            `DELETE FROM employee WHERE concat(employee.First_name," ",employee.Last_name) ='${response.employeeToDelete}';`
          );
        await console.log(
          `Removed ${response.employeeToDelete} from the database `
        );
      });
    return;
  }
}
module.exports = Employee;
