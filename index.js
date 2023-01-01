const mysql = require('mysql2');
const inquirer = require('inquirer');
const table = require('console.table');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'employees_db'
    },
);

db.connect(function (err) {
  if (err) throw err;
  console.log('Your Employee List');
  startPrompt();
});

function startPrompt() {
  inquirer.prompt({
    message: "Select an option below to continue.",
    type: "list",
    choices: [
      "View all departments",
      "View all employees",
      "View all roles",
      "Add a department",
      "Add an employee",
      "Add a role",
      "Update an employee role",
      "Update a role",
      "Exit"
    ], 
    name: "choice"
  }).then(answers => {
    switch (answers.choice) {
      case "View all departments":
        viewDepartments()
        break;
      case "View all employees":
        viewEmployees()
        break;
      case "View all roles":
        viewRoles()
        break;
      case "Add a department":
        addDepartment()
        break;
      case "Add a employee":
        addEmployee()
        break;
      case "Add a role":
        addRole()
        break;
      case "Update an employee role":
        updateRole()
        break;
      case "Update a role":
        updateRole()
        break;
    };
  });
};

function viewDepartments() {
  db.query(`SELECT * FROM department;`, (err, data) => {
    if (err) throw err;
    console.table(data);
    startPrompt();
  });
};


function viewEmployees() {
  db.query(`SELECT * FROM employee;`, (err, data) => {
    if (err) throw err;
    console.table(data);
    startPrompt();
  });
};

function viewRoles() {
  db.query(`SELECT * FROM role;`, (err, data) => {
    if (err) throw err;
    console.table(data);
    startPrompt();
  });
};

function addDepartment() {
  inquirer.prompt({
    type: "input",
    name: "department",
    message: "What department would you like to add?"
  }).then(function(response) {
    db.query(`INSERT INTO department (name) VALUES (?)`,
    [response.department], (err, data) => {
      if (err) throw err;
      console.log("You have created a new department");
      startPrompt();
    })
  })
}


function addEmployee() {
  inquirer.prompt([
    {
      message: "What is there first name??",
      type: "input",
      name: "first_name"
    },
    {
      message: "What is there last name??",
      type: "input",
      name: "last_name"
    },
    {
      message: "What is their manager I.D.??",
      type: "input",
      name: "manager_id"
    },
    {
      message: "What is their role I.D.??",
      type: "number",
      name: "role_id"
    },
  ]).then(function(response) {
    db.query(`INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES (?,?,?,?)`,
    [response.first_name, response.last_name, response.manager_id, response.role_id],
    (err,data) => {
      if (err) throw err;
      console.log("You have added a new empolyee!!!!");
      startPrompt();
    });
  });
};


function addRole() {
  inquirer.prompt([
    {
      message: "What is the role's title?",
      type: "input",
      name: "title"
    },
    {
      message: "What is the role's pay?",
      type: "input",
      name: "pay"
    },
    {
      message: "What is the derpartment ID for the role?",
      type: "number",
      name: "department_id"
    }
  ]).then(function(response) {
    db.query(`INSERT INTO role (title, pay, department_id) VALUES (?, ?, ?)`,
    [response.title, response.pay, response.department_id],
    (err, data) => {
      if (err) throw err;
      console.log("Successfully created new role!");
      startPrompt();
    });
  });
};

function updateRole() {
  inquirer.prompt([
    {
      message: "Which role do you want to update? Enter the last name.",
      type: "input",
      name: "last_name"
    },
    {
      message: "What is their new role ID?",
      type: "number",
      name: "role_id"
    }
  ]).then(function(response) {
    db.query(`UPDATE employee SET role_id = ? WHERE last_name = ?`, 
    [response.role_id, response.last_name],
    (err, data) => {
      if (err) throw err;
      console.log("You have updated a role!!");
      startPrompt();
    });
  });
};

function quit () {
  console.log("Thank You for choosing our editor! Goodbye!");
  process.exit();
}