const mysql = require('mysql2');

// database connection
const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      user: 'root',
      password: '1234',
      port: 3306,
      database: 'employee_tracker_db'
    },
    console.log(`Connected to the employee_tracker_db database.`)
  );

module.exports = db;