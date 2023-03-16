// imports
const inquirer = require("inquirer");
const cTable = require("console.table");
// empty array variable to be used later
const departments = [];

// Department class constructor to hold department functions
class Department {
  constructor() {}
  // show departments table
  async display(db) {
    await db
      .promise()
      .query("SELECT * FROM department")
      .then(([results, err]) => {
        console.log(" ");
        console.table(results);
        return [results, err];
      });
    return;
  }

  // add to departments table
  async add(db) {
    // ask what department name to add
    await inquirer
      .prompt({
        type: "input",
        message:
          "Please type the name of the department that you would like to add:",
        name: "dept",
      })
      .then(async (response) => {
        // add department to database
        await db
          .promise()
          .query(
            `INSERT INTO department (Department) VALUES ("${response.dept}");`
          )
          .then(
            await function () {
              console.log(`Added ${response.dept} to the database`);
              return;
            }
          );
      });
    return;
  }

  // delete department record from db
  async destroy(db) {
    // query department table in db and fill department array
    await db
      .promise()
      .query(
        `SELECT department.Department
        FROM department`
      )
      .then(async ([results, err]) => {
        await results.forEach(async (element) =>
          departments.push(element.Department)
        );
        return;
      });
    // user input for which department to delete
    await inquirer
      .prompt([
        {
          type: "list",
          message: "What department would you like to delete?",
          choices: departments,
          name: "deptToDelete",
        },
      ])
      .then(async (response) => {
        // delete department record from db
        await db
          .promise()
          .query(
            `DELETE FROM department WHERE Department='${response.deptToDelete}';`
          );
        await console.log(
          `Removed ${response.deptToDelete} from the database `
        );
      });
    return;
  }
}
module.exports = Department;
