const database = require('./db');
const consoleTable = require('console.table');

function DatabaseQueries(promptCallback) {
  this.viewAllDepartments = function () {
    database.query('SELECT id, department_name AS name FROM departments', function (err, results) {
      if (err) throw err;
      console.table(results);
      promptCallback(); // Call the promptCallback after displaying the results
    });
  };

  this.viewAllRoles = function () {
    database.query('SELECT roles.id, roles.title, departments.department_name AS department, roles.salary FROM roles JOIN departments ON roles.department_id = departments.id ORDER BY roles.id', function (err, results) {
      if (err) throw err;
      console.table(results);
      promptCallback();
    });
  };

  this.viewAllEmployees = function () {
    database.query('SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department_name AS department, roles.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees AS manager ON employees.manager_id = manager.id', function (err, results) {
      if (err) throw err;
      console.table(results);
      promptCallback();
    });
  };

  this.addDepartment = function (departmentName) {
    const query = 'INSERT INTO departments (name) VALUES (?)';
    database.query(query, [departmentName], function (err, results) {
      if (err) throw err;
      console.table(results);
      promptCallback();
    });
  };

  // Implement other functions like addRole, addEmployee, updateEmployeeRole, etc.
}

module.exports = DatabaseQueries;
