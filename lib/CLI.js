const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

// require in class constructors
const Department = require("./Department");
const department = new Department();
const Role = require("./Role.js");
const role = new Role();
const Employee = require("./Employee.js");
const employee = new Employee();

// callback function to display main menu
const showMenu = () => {
  // list question to create menu and listen for response
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
      const db = mysql.createConnection({
        host: "127.0.0.1",
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      // Direct CLI to do different functions based on user selection
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
    .then(() => {
      // callback the menu again after completing previous task
      return showMenu();
    });
};

// class constructor to create cli.run() function
class CLI {
  constructor() {}
  run() {
    return showMenu();
  }
}

// export CLI.run()
module.exports = CLI;
