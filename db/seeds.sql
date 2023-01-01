INSERT INTO department (name)
VALUES 
('IT'),
('Finance & Accounting'),
('Misc'),
('Operations');

INSERT INTO role (title, pay, department_id)
VALUES
('Full Stack Developer', 80000, 1),
('Software Engineer', 120000, 1),
('Pro Tuner', 10000, 3), 
('Finanical Aid', 150000, 2),
('Pro Drifter', 70000, 3), 
('Floor Director', 90000, 4),
('Project Manager', 100000, 4),
('Operations Associate', 90000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Payton', 'Ray', 2, null),
('John', 'Doe', 1, 1),
('Tim', 'Tebow', 4, null),
('Chris', 'Jones', 3, 3),
('Trey', 'York', 6, null),
('Junyi', 'Chun', 5, 5),
('Jackson', 'Jones', 7, null),
('Izzy', 'York', 8, 7);