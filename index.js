const mysql = require('mysql2');
const inquirer = require('inquirer');
const database = require('./db/db'); 
const DatabaseQueries = require('./db/queries'); 

const connection = database;



// use Inquirer to prompt the user to input
function promptUser() {
    inquirer
      .prompt([
        // Prompt for the main menu options
        {
          type: 'list',
          name: 'menuOption',
          message: 'What would you like to do?',
          choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit',
          ],
        },
      ])
      .then((answers) => {
        // Handle the user's selection and call the appropriate functions
        switch (answers.menuOption) {
          case 'View all departments':
            viewAllDepartments();
            break;
          case 'View all roles':
            viewAllRoles();
            break;
          case 'View all employees':
            viewAllEmployees();
            break;
          case 'Add a department':
            addDepartment();
            break;
          case 'Add a role':
            addRole();
            break;
          case 'Add an employee':
            addEmployee();
            break;
          case 'Update an employee role':
            updateEmployeeRole();
            break;
          case 'Exit':
            connection.end(); // close database connection
            return;
        }
        
        
      });
  }
  

const queries = new DatabaseQueries(promptUser);

function viewAllDepartments() {
  queries.viewAllDepartments();
}

function viewAllRoles() {
  queries.viewAllRoles();
}

function viewAllEmployees() {
  queries.viewAllEmployees();
}

function addDepartment() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'departmentName',
          message: 'What is the name of the department?',
        },
      ])
      .then((answers) => {
        const { departmentName } = answers;
        queries.addDepartment(departmentName);
      });
  }

function addRole() {
    const departmentChoices = [];
  const query = 'SELECT id, department_name FROM departments';
  database.query(query, function (err, results) {
    if (err) throw err;
    results.forEach(function (department) {
      departmentChoices.push({
        value: department.id,
        name: department.department_name
      });
    });

    // Prompt user for role details
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the title of the new role:'
        },
        {
          type: 'input',
          name: 'salary',
          message: 'Enter the salary for the new role:'
        },
        {
          type: 'list',
          name: 'departmentId',
          message: 'Select the department for the new role:',
          choices: departmentChoices
        }
      ])
      .then(function (answers) {
        queries.addRole(answers.title, answers.salary, answers.departmentId);
      });
  });
}

// Prompt user for employee details and call addEmployee function
function addEmployee() {
    // Fetch the role choices from the database
    const roleChoices = [];
    const query = 'SELECT id, title FROM roles';
    database.query(query, function (err, results) {
      if (err) throw err;
      results.forEach(function (role) {
        roleChoices.push({
          value: role.id,
          name: role.title
        });
      });
  
      // Fetch the employee choices from the database
      const employeeChoices = [];
      const employeeQuery = 'SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employees';
      database.query(employeeQuery, function (err, employeeResults) {
        if (err) throw err;
        employeeResults.forEach(function (employee) {
          employeeChoices.push({
            value: employee.id,
            name: employee.name,
          });
        });
  
        // Prompt user for employee details
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'firstName',
              message: 'What is the employee`s first name?'
            },
            {
              type: 'input',
              name: 'lastName',
              message: 'What is the employee`s last name'
            },
            {
              type: 'list',
              name: 'roleId',
              message: 'What is the employee`s role?',
              choices: roleChoices
            },
            {
              type: 'list',
              name: 'managerId',
              message: 'Who is the employee`s manager',
              choices: [
                { value: null, name: 'None' }, 
                ...employeeChoices
              ]
            }
          ])
          .then(function (answers) {
            queries.addEmployee(answers.firstName, answers.lastName, answers.roleId, answers.managerId);
          });
      });
    });
  }
  
  

// Implement other functions in a similar manner
promptUser();