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
            connection.end(); // Close the database connection
            return;
          default:
            console.log('Invalid option. Please try again.');
            promptUser(); // Show the menu prompt again
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
  

// Implement other functions in a similar manner
promptUser();