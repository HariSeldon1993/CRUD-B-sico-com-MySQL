# CRUD-B-sico-com-MySQL
CRUD Básico apenas para verificação de funcionalidades com MySQL / XAMPP / NodeJS

- ReactJS
- NodeJS
- Nodemon
- XAMPP
- MySQL
- Express
- Material-UI

-Execute 'npm install' nas pastas 'server' e 'client'

Script para Base de Dados no MySQL:

>>>
create database cadastro;
use cadastro;

create table users(
id int auto_increment primary key,
nome varchar(30) not null,
email varchar(100) not null,
idade int(2) not null
);

insert into users (nome, email, idade) values ("Senna", "senna@email.com", 28);
<<<
