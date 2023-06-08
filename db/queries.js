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
    const query = 'INSERT INTO departments (department_name) VALUES (?)';
    database.query(query, [departmentName], function (err, results) {
      if (err) throw err;
      console.log(`${departmentName} has been added to the database!`);
      promptCallback();
    });
  };

  this.addRole = function (title, salary, departmentId) {
    const query = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
    database.query(query, [title, salary, departmentId], function (err, results) {
      if (err) throw err;
      console.log(`${title} has been added to the database!`);
      promptCallback();
    });
  };

  this.addEmployee = function (firstName, lastName, roleId, managerId) {
    const query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
    database.query(query, [firstName, lastName, roleId, managerId], function (err, results) {
      if (err) throw err;
      console.log('New employee has been added to the database!');
      promptCallback();
    });
  };
  
  
  // Implement other functions like addRole, addEmployee, updateEmployeeRole, etc.
}

module.exports = DatabaseQueries;
