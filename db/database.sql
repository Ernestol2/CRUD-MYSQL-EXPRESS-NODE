CREATE DATABASE IF NOT EXISTS empresadb;

USE empresadb;

CREATE TABLE employee (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    salary INT(7) DEFAULT NULL,
    PRIMARY KEY (id) 
);

DESCRIBE employee;

/* this was used to change password
ALTER USER 'root'@'localhost' IDENTIFIED WITH 'oldpass' BY 'newpass';
FLUSH PRIVILEGES; */

INSERT INTO employee VALUES
('1', 'JUan', '200000'),
('2','Pedro', '36890'),
('3','Jose', '1000'),
('4','Maria', '100'),
('5','Ana', '30000');
