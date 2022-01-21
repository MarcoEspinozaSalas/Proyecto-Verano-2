create database proyecto2DB
GO
use proyecto2DB
GO
create table users
(
    id int IDENTITY(1,1) primary key,
    fullname varchar (100) not null,
    email varchar (100) unique,
    password varchar(256) not null
);
GO


CREATE TABLE category (
    idCategory int IDENTITY(1,1) primary key ,
	nameCategory varchar(20) not null
);
go
CREATE TABLE functions(
	idFunction int IDENTITY(1,1) primary key,
	name varchar(100) not null,
	description varchar(200) not null,
	code varchar(2000) not null,
	idUser int FOREIGN KEY REFERENCES users(id),
	idCategory int FOREIGN KEY REFERENCES category(idCategory)
);
go
select * from users

SELECT * FROM users WHERE email = 'test@test'

insert into users values('test','test@test.com','1234');

DROP table users