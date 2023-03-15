const inquirer = require("inquirer");
const Font = require("ascii-art-font");
const mysql = require("mysql2");

const Department = require("./Department.js");
const department = new Department();
const Role = require("./Role.js");
const role = new Role();
const Employee = require("./Employee.js");
const employee = new Employee();

class CLI {
  constructor() {}
  run() {
    return (
      inquirer
        .prompt({
          type: "list",
          message: "Choose from the following options:  ",
          choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
            "QUIT",
          ],
          name: "selected",
        })
        //check text length
        .then((response) => {
          // mySQL connect
          const db = mysql.createConnection(
            {
              host: "127.0.0.1",
              user: "root",
              password: "root",
              database: "employees_db",
            }

            // console.log(`Connected to the employees_db database.`)
          );

          //Direct CLI what to show based on user selection
          if (response.selected === "QUIT") {
            console.log("Have a great day! See ya later alligator!");
            process.exit();
          } else if (response.selected === "View All Departments") {
            department.display(db);
            return;
          } else if (response.selected === "View All Roles") {
            role.display(db);
          } else if (response.selected === "View All Employees") {
            employee.display(db);
          } else if (response.selected === "Add Department") {
            department.add(db);
          } else if (response.selected === "Add Role") {
            role.add(db);
          } else if (response.selected === "Add Employee") {
            employee.add(db);
          } else if (response.selected === "Update Employee Role") {
            employee.update(db);
          }
          return response;
        })
    );
  }
}

module.exports = CLI;

// const cli = new CLI();
// cli.run();
