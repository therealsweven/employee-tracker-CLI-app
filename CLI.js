const inquirer = require("inquirer");
const Font = require("ascii-art-font");

class CLI {
  constructor() {}
  run() {
    return (
      inquirer
        .prompt({
          type: "list",
          message: "Choose from the following options:  ",
          choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Update Employee Role",
            "QUIT",
          ],
          name: "selected",
        })
        //check text length
        .then((response) => {
          if (response.selected === "QUIT") {
            console.log("Have a great day! See ya later alligator!");
            return;
          }
          //   console.log(response);
          //   if (response.text.length > 3) {
          //     throw new Error(
          //       "Please run program again and enter text 3 characters or less in length."
          //     );
          //   }
          return response;
        })
    );
  }
}

module.exports = CLI;

cli = new CLI();
cli.run();
