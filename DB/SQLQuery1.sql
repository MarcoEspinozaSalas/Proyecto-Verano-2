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


select * from users

SELECT * FROM users WHERE email = 'test@test'

insert into users values('test','test@test.com','1234');

DROP table users