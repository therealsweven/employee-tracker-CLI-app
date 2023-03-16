const inquirer = require("inquirer");
const cTable = require("console.table");
const departments = [];

class Department {
  constructor() {}
  async display(db) {
    await db
      .promise()
      .query("SELECT * FROM department")
      .then(async ([results, err]) => {
        await console.table(results);
        return [results, err];
      })
      .catch((err) => {});
    // .then(() => {
    //   main.run();
    // });
    return;
  }
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
  async destroy(db) {
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
