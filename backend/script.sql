start transaction; # Si el script falla, sql hace un rollback de todos los cambios antes de ejecutar el script.

# ------- DATABASE -------

create database if not exists proyecto4;

use proyecto4;

# ------- TABLAS -------

create table if not exists contacts (
	id_contacts int not null primary key auto_increment,
	firstName varchar(255) not null,
	lastName varchar(255) not null,
	email varchar(255) not null,
	address varchar(255) not null,
    interest int not null,
    createdAt datetime not null default CURRENT_TIMESTAMP,
	updatedAt datetime not null default CURRENT_TIMESTAMP,
	company int not null,
	role int not null,
	city int not null
);

create table if not exists users (
	id_users int not null primary key auto_increment,
	name varchar(255) not null,
	lastName varchar(255) not null,
	email varchar(255) not null,
	username varchar(255) not null,
	password varchar(255) not null,
	profile int(11) not null,
	createdAt datetime not null default CURRENT_TIMESTAMP,
	updatedAt datetime not null default CURRENT_TIMESTAMP
);

create table if not exists profiles (
	id_profiles int not null primary key auto_increment,
	name varchar(255) not null,
	createdAt datetime not null default CURRENT_TIMESTAMP,
	updatedAt datetime not null default CURRENT_TIMESTAMP
);

create table if not exists roles (
    id_roles int not null primary key auto_increment,
    name varchar(255) not null,
    createdAt datetime not null default CURRENT_TIMESTAMP,
	updatedAt datetime not null default CURRENT_TIMESTAMP
);

create table if not exists companies (
    id_companies int not null primary key auto_increment,
    name varchar(255) not null,
    city int not null,
    email varchar(255) not null,
    address varchar(255) not null,
    number int not null,
    createdAt datetime not null default CURRENT_TIMESTAMP,
	updatedAt datetime not null default CURRENT_TIMESTAMP
);

create table if not exists cities (
	id_cities int not null primary key auto_increment,
	name varchar(255) not null,
	country int not null,
	createdAt datetime not null default CURRENT_TIMESTAMP,
	updatedAt datetime not null default CURRENT_TIMESTAMP
);

create table if not exists regions (
    id_region int not null primary key auto_increment,
    name varchar(255) not null,
    createdAt datetime not null default CURRENT_TIMESTAMP,
	updatedAt datetime not null default CURRENT_TIMESTAMP
);

create table if not exists countries (
	id_countries int not null primary key auto_increment,
	name varchar(255) not null,
	createdAt datetime not null default CURRENT_TIMESTAMP,
	updatedAt datetime not null default CURRENT_TIMESTAMP,
	region int not null
);

create table if not exists channels (
    id_channels int not null primary key auto_increment,
    name varchar(255) not null,
    createdAt datetime not null default CURRENT_TIMESTAMP,
	updatedAt datetime not null default CURRENT_TIMESTAMP
);

create table if not exists media (
	id_media int not null primary key auto_increment,
	channeldetail varchar(255) not null,
	createdAt datetime not null default CURRENT_TIMESTAMP,
	updatedAt datetime not null default CURRENT_TIMESTAMP,
	preferences int not null,
	channels int not null

);

create table if not exists preferences (
	id_preferences int not null primary key auto_increment,
	name varchar(255) not null,
	createdAt datetime not null default CURRENT_TIMESTAMP,
	updatedAt datetime not null default CURRENT_TIMESTAMP
);

create table if not exists contactmedia (
	id_media int not null,
	id_contacts int not null,
	createdAt datetime not null default CURRENT_TIMESTAMP,
	updatedAt datetime not null default CURRENT_TIMESTAMP
);

ALTER TABLE proyecto4.contactmedia ADD CONSTRAINT `PRIMARY` PRIMARY KEY (id_media,id_contacts);
ALTER TABLE proyecto4.contactmedia ADD CONSTRAINT contactmedia_id_contacts_id_media_unique UNIQUE KEY (id_media,id_contacts);
ALTER TABLE proyecto4.contactmedia ADD CONSTRAINT contactmedia_FK FOREIGN KEY (id_contacts) REFERENCES proyecto4.contacts(id_contacts);
ALTER TABLE proyecto4.contactmedia ADD CONSTRAINT contactmedia_FK_1 FOREIGN KEY (id_media) REFERENCES proyecto4.media(id_media);

# ------- REGISTROS -------

insert into profiles (name) values ('Basic');
insert into profiles (name) values ('Admin');

insert into regions (name) values ('Sudamerica');
insert into regions (name) values ('Norteamerica');

insert into roles (name) VALUES ('UX Designer');
insert into roles (name) VALUES ('Developer');
insert into roles (name) VALUES ('Sales');
insert into roles (name) VALUES ('Product');
insert into roles (name) VALUES ('UI Designer');
insert into roles (name) values ("DevOps Engineer");

insert into channels (name) values ('WhatsApp');
insert into channels (name) values ('Facebook');
insert into channels (name) values ('Llamada');
insert into channels (name) values ('Email');
insert into channels (name) values ('Instagram');

insert into preferences (name) values ("No molestar");
insert into preferences (name) values ("Canal Favorito");
insert into preferences (name) values ("Sin preferencia");

insert into countries (name, region) values ('Argentina', 1);
insert into countries (name, region) values ('Colombia', 1);
insert into countries (name, region) values ('Mexico', 2);
insert into countries (name, region) values ('Chile', 1);
insert into countries (name, region) values ('Uruguay', 1);
insert into countries (name, region) values ('Estados Unidos', 2);

insert into cities (name, country) values ('Buenos Aires', 1);
insert into cities (name, country) values ('Cordoba', 1);
insert into cities (name, country) values ('Bogota', 2);
insert into cities (name, country) values ('Medellin', 2);
insert into cities (name, country) values ('Cucuta', 2);
insert into cities (name, country) values ('Ciudad De Mexico', 3);
insert into cities (name, country) values ('Tijuana', 3);
insert into cities (name, country) values ('Atacama', 4);
insert into cities (name, country) values ('Santiago', 4);
insert into cities (name, country) values ('Valparaiso', 4);
insert into cities (name, country) values ('Canelones', 5);
insert into cities (name, country) values ('Maldonado', 5);
insert into cities (name, country) values ('Montevideo', 5);
insert into cities (name, country) values ('Florida', 6);
insert into cities (name, country) values ('Texas', 6);

insert into companies (name, city, address, email, number) values ('Ecom Experts', 2, 'Beauchef 899', 'ecomexperts@gmail.com', 52364148);
insert into companies (name, city, address, email, number) values ('Acamica', 1, 'Humboldt 1967', 'hola@acamica.com', 19671414);
insert into companies (name, city, address, email, number) values ('Despegar', 3, 'Ezeiza 3032', 'soporte@despegar.com.ar', 8101010);
insert into companies (name, city, address, email, number) values ('Botmaker', 4, 'Av. Congreso 2171', 'botmaker@io.com', 51234696);
insert into companies (name, city, address, email, number) values ('Netflix', 5, 'Winchester Circle', 'netflix@support.com', 7160414);
insert into companies (name, city, address, email, number) values ('MercadoLibre', 1, 'Av. del Libertador 101', 'hola@mercadolibre.com.ar', 47440001);
insert into companies (name, city, address, email, number) values ('Globant', 1, 'Humberto 1º 53', 'hello@globant.com', 41091700);
insert into companies (name, city, address, email, number) values ('Telecom', 2, 'Boulogne Sur Mer 917', 'soporte@telecom.com.ar', 5550018);
insert into companies (name, city, address, email, number) values ('Naranja', 1, 'Av. Manuel Belgrano 285', 'tarjeta@naranja.com.ar', 3336272);
insert into companies (name, city, address, email, number) values ('Uala', 1, 'Av. Mitre 2334', 'soporte@uala.com.ar', 12345678);

insert into users (username, name, lastName, password, profile, email)
values ('Bronskins', 'Pablo', 'Correa', '$2a$10$AXfhl5THhCXuUbqACnJ1P.CFPCQfNat4L7inYQJ58vYYdIOpSTyR2', 2, 'bronskins@hotmail.com');

insert into contacts (address, firstName, lastName, email, interest, city, role, company)
values ("Manuel Belgrano 1187","Camila Soledad", "Panto", "camilapanto123@gmail.com", 100,1, 1, 1);

insert into contacts (address,firstName, lastName, email, interest, city, role, company)
values ("Alem 543","Agustin Emanuel", "Soria", "agustinesoria@gmail.com", 100, 1, 5, 2);

insert into contacts (address,firstName, lastName, email, interest, city, role, company)
values ("9 De Julio 148", "Denven Steven", "Soria", "denver-steven@gmail.com", 100, 2, 2, 3);

insert into contacts (address,firstName, lastName, email, interest, city, role, company)
values ("Aguero 3200","Sebastian Agustin", "Panto", "sebapanto@gmail.com", 75, 2, 2, 3);

insert into contacts (address,firstName, lastName, email, interest, city, role, company)
values ("La Pampa 1335", "Stefania Natali", "Soria", "stefisoria@gmail.com", 75, 2, 3, 5);

insert into contacts (address,firstName, lastName, email, interest, city, role, company)
values ("Av. Del Libertador 3200", "Milena Victoria", "Soria", "milesoria@gmail.com", 50, 1, 3, 6);

insert into contacts (address,firstName, lastName, email, interest, city, role, company)
values ("Av. Guemes 320", "Valentina", "Boetto", "valenboetto@gmail.com", 50, 2, 5, 7);

insert into contacts (address,firstName, lastName, email, interest, city, role, company)
values ("Juan Jose Ortiz 320", "Juan", "Sbeghem", "juan-sbg@gmail.com", 25, 1, 2, 8);

insert into contacts (address,firstName, lastName, email, interest, city, role, company)
values ("Av. Scalabrada Ortiz 922", "Guillermina", "Budano", "guillebudano@gmail.com", 25, 1, 4, 8);

insert into contacts (address,firstName, lastName, email, interest, city, role, company)
values ("Aldecoa 1099","Laura", "Errante", "laurapastelera@gmail.com", 0, 2, 3, 10);

insert into media (channeldetail, preferences, channels) 
values ("+54113615058", 2, 1);

insert into media (channeldetail, preferences, channels) 
values ("www.facebook.com", 2, 2);

insert into media (channeldetail, preferences, channels) 
values ("+54113615058", 2, 1);

insert into media (channeldetail, preferences, channels) 
values ("test@email.com", 2, 5);

insert into media (channeldetail, preferences, channels) 
values ("@pablitoo.cr", 2, 5);

insert into media (channeldetail, preferences, channels) 
values ("+54113615058", 2, 3);

insert into media (channeldetail, preferences, channels) 
values ("+54113615058", 2, 4);

insert into media (channeldetail, preferences, channels) 
values ("www.facebook.com", 2, 2);

insert into media (channeldetail, preferences, channels) 
values ("bronskins@hotmail.com", 2, 5);

insert into contactmedia (id_contacts, id_media)
values (1, 1);

insert into contactmedia (id_contacts, id_media)
values (2, 2);

insert into contactmedia (id_contacts, id_media)
values (2, 3);

insert into contactmedia (id_contacts, id_media)
values (3, 4);

insert into contactmedia (id_contacts, id_media)
values (3, 5);

insert into contactmedia (id_contacts, id_media)
values (4, 6);

insert into contactmedia (id_contacts, id_media)
values (4, 7);

insert into contactmedia (id_contacts, id_media)
values (5, 8);

insert into contactmedia (id_contacts, id_media)
values (5, 9);


commit; # final del script
