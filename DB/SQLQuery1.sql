--Create DB
create database proyecto2DB
GO
use proyecto2DB
GO

--Create table users
create table users
(
    id int IDENTITY(1,1) primary key,
    fullname varchar (100) not null,
    email varchar (100) unique,
    password varchar(256) not null
);
GO

--Create table category
CREATE TABLE category (
    idCategory int IDENTITY(1,1) primary key ,
	nameCategory varchar(20) not null
);
go

--Create table functions
CREATE TABLE functions(
	idFunction int IDENTITY(1,1) primary key,
	name varchar(100) not null,
	description varchar(200) not null,
	code varchar(2000) not null,
	idUser int FOREIGN KEY REFERENCES users(id),
	idCategory int FOREIGN KEY REFERENCES category(idCategory)
);
go
