const inquirer = require("inquirer");
const cTable = require("console.table");
const depts = [];
const roles = [];
class Role {
  constructor() {}
  async display(db) {
    await db
      .promise()
      .query(
        `SELECT role.ID, role.Title, department.Department, role.Salary
    FROM role
    INNER JOIN department ON role.Department_id = Department.id;`
      )
      .then(async ([results, err]) => {
        await console.table(results);
        return results;
      });
    return;
  }
  async add(db) {
    await db
      .promise()
      .query("SELECT * FROM department")
      .then(function ([results, err]) {
        // console.log(results);
        results.forEach((element) => depts.push(element.Department));
        return depts;
      })
      .then(async (depts) => {
        // ask for info about role to add
        await inquirer
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
          .then(async (response) => {
            const dept_id = depts.indexOf(response.dept) + 1;
            // add department to database
            await db
              .promise()
              .query(
                `INSERT INTO role (title, salary, department_id) VALUES ("${response.title}","${response.salary}","${dept_id}");`
              )
              .then(function () {
                console.log(`Added ${response.title} to the database`);
                return;
              });
          });
        return;
      });
  }
  async destroy(db) {
    await db
      .promise()
      .query(
        `SELECT role.Title
        FROM role`
      )
      .then(async ([results, err]) => {
        await results.forEach(async (element) => roles.push(element.Title));
        return;
      });
    await inquirer
      .prompt([
        {
          type: "list",
          message: "What role would you like to delete?",
          choices: roles,
          name: "roleToDelete",
        },
      ])
      .then(async (response) => {
        await db
          .promise()
          .query(`DELETE FROM role WHERE Title='${response.roleToDelete}';`);
        await console.log(
          `Removed ${response.roleToDelete} from the database `
        );
      });
    return;
  }
}
module.exports = Role;
