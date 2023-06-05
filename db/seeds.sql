INSERT INTO department (department_name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 250000, 4);
       ("Accountant", 125000, 3),
       ("Account Manager", 160000, 3),
       ("Lawyer", 190000, 4),
       ("Sales Lead", 100000, 1),
       ("Salesperson", 80000, 1),
       ("Lead Engineer", 150000, 2),
       ("Software Engineer", 120000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 5, null),
       ("Mike", "Chan", 6, 1),
       ("Ashley", "Rodriguez", 7, null),
       ("Kevin", "Tupik", 8, 3),
       ("Kunal", "Singh", 3, null),
       ("Malia", "Brown", 2, 5),
       ("Sarah", "Lourd", 1, null), 
       ("Tom", "Allen", 4, 7);
