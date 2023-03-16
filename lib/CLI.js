const inquirer = require("inquirer");
const Font = require("ascii-art-font");
const mysql = require("mysql2");

const Department = require("./Department");
const department = new Department();
const Role = require("./Role.js");
const role = new Role();
const Employee = require("./Employee.js");
const employee = new Employee();

const showMenu = () => {
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
        "Delete Employee",
        "Delete Role",
        "Delete Department",
        "QUIT",
      ],
      name: "selected",
    })
    //check text length
    .then(async (response) => {
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

      // Direct CLI based on user selection
      if (response.selected === "QUIT") {
        console.log("Have a great day! See ya later alligator!");
        process.exit();
      } else if (response.selected === "View All Departments") {
        await department.display(db);
      } else if (response.selected === "View All Roles") {
        await role.display(db);
      } else if (response.selected === "View All Employees") {
        await employee.display(db);
      } else if (response.selected === "Add Department") {
        await department.add(db);
      } else if (response.selected === "Delete Department") {
        await department.destroy(db);
      } else if (response.selected === "Add Role") {
        await role.add(db);
      } else if (response.selected === "Delete Role") {
        await role.destroy(db);
      } else if (response.selected === "Add Employee") {
        await employee.add(db);
      } else if (response.selected === "Delete Employee") {
        await employee.destroy(db);
      } else if (response.selected === "Update Employee Role") {
        await employee.update(db);
      }
      return response;
    })
    .then((response) => {
      return showMenu();
    });
};

class CLI {
  constructor() {}
  run() {
    return showMenu();
  }
}

module.exports = CLI;
