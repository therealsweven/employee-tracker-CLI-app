INSERT INTO department (Department)
VALUES 
("Sales"),
("Engineering"),
("Finance"),
("Legal");

INSERT INTO role (Title, Salary, Department_id)
VALUES 
("Sales Lead", 100000, 1),
("Sales Associate", 80000, 1),
("Lead Engineer", 150000, 2),
("Software Engineer", 120000, 2),
("Account Manager", 160000, 3),
("Accountant", 125000, 3),
("Legal Team Lead", 250000, 4),
("Lawyer", 129000, 4);

INSERT INTO employee (First_name, Last_name, Role_id, Manager_id)
VALUES
("Toby", "McGuire", 1, null),
("Dory", "Bluefish", 2, 1),
("Robert", "Simpson", 3, null),
("Joe", "Biden", 4, 3),
("Timmy","Turner",5, null),
("Cosmo","Fairyman",6,5),
("Jackie", "Chan", 7, null),
("Mackie", "Can", 8,7);

