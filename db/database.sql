/* postgresql db  */

CREATE DATABASE empresadb;
/* only in mysql or mariadb */
USE empresadb;

/* create table*/
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    name VARCHAR(45),
    salary INT
);

/* describe table mysql */
DESCRIBE employee;

/* describe table sql*/
\d employee;

/* this was used to change password
ALTER USER 'root'@'localhost' IDENTIFIED WITH 'oldpass' BY 'newpass';
FLUSH PRIVILEGES; */


/* sql */
INSERT INTO employee VALUES
('1', 'JUan', '200000'),
('2','Pedro', '36890'),
('3','Jose', '1000'),
('4','Maria', '100'),
('5','Ana', '30000');

/* postgre */

INSERT INTO employee (id, name, salary)
VALUES
  (1, 'Juan', 200000),
  (2, 'Pedro', 36890),
  (3, 'Jose', 1000),
  (4, 'Maria', 100),
  (5, 'Ana', 30000);

