export const schema: string = `set search_path = vetdb;

drop schema if exists vetdb cascade;
create schema vetdb;
drop domain if exists vetdb.sextype;
drop table if exists vetdb.clinique;
drop table if exists vetdb.personnel;
drop table if exists vetdb.examen;
drop table if exists vetdb.traitement;
drop table if exists vetdb.animal;
drop table if exists vetdb.proprietaire;
drop table if exists vetdb.resultat;
create domain vetdb.sextype as char
	check(value in ('m','f'));
create table if not exists vetdb.clinique(
	numero varchar(10) not null,
	rue varchar(20) not null,
	ville varchar(20) not null,
	province varchar(20) not null,
	codepostal varchar(6) not null,
	gestionnaireno varchar(10) not null,
	telecopieur varchar(12) not null,
	telephone varchar(12) not null,
	primary key(numero)
);
create table if not exists vetdb.proprietaire(
	numero varchar(10) not null,
	cliniquenumero varchar(10) not null,
	nom varchar(20) not null,
	adresse varchar(50) not null,
	telephone varchar(15) not null,
	primary key(numero, cliniquenumero),
	foreign key(cliniquenumero) references vetdb.clinique(numero)
);
create table if not exists vetdb.employe(
	numero varchar(10) not null,
	cliniquenumero varchar(10) not null,
	nom varchar(20) not null,
	prenom varchar(20) not null,
	adresse varchar(50) not null,
	telephone varchar(15) not null,
	datenaissance date not null,
	sexe vetdb.sextype default 'm',
	nas varchar(11) unique not null,
	fonction varchar(15) not null,
	salaire numeric(10,0),
	primary key(numero)
);
create table if not exists vetdb.veterinaire(
	numeroemploye varchar(10) not null unique,
	estenservice bool not null,
    primary key(numeroemploye),
	foreign key(numeroemploye) references vetdb.employe(numero)
);
create table if not exists vetdb.traitement(
	numero varchar(10) not null,
	description varchar(50) not null,
	cout numeric(7,2) not null,
	primary key(numero)
);
create table if not exists vetdb.animal(
	numero varchar(10) not null unique,
	proprietairenumero varchar(10) not null,
	cliniquenumero varchar(10) not null,
	nom varchar(20) not null,
	type varchar(15) not null,
	description varchar(50) not null,
	datenaissance date not null,
	dateinscription date not null,
	etatactuel varchar(15) not null,
	primary key(numero, cliniquenumero),
	foreign key(proprietairenumero, cliniquenumero) references vetdb.proprietaire(numero, cliniquenumero)
);
create table if not exists vetdb.examen(
	numero varchar(10) not null,
	veterinairenumero varchar(10) not null,
	numeroanimal varchar(10) not null,
	date date not null,
	heure time not null,
	description varchar(50) not null,
	primary key(numero, numeroanimal),
	foreign key(veterinairenumero) references vetdb.veterinaire(numeroemploye), 
	foreign key(numeroanimal) references vetdb.animal(numero)
);
create table if not exists vetdb.prescription(
	numeroexamen varchar(10) not null,
	numerotraitement varchar(10) not null,
	numeroanimal varchar(10) not null,
	qtetraitement numeric(2,0) not null,
	datedebut date not null,
	datefin date not null,
	primary key(numeroexamen, numerotraitement),
	foreign key(numeroexamen, numeroanimal) references vetdb.examen(numero, numeroanimal),
	foreign key(numerotraitement) references vetdb.traitement(numero)
);
`;
