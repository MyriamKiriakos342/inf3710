export const schema: string = `
CREATE DATABASE IF NOT EXISTS VETDB;

SET search_path = VETDB;

DROP SCHEMA IF EXISTS VETDB CASCADE;
CREATE SCHEMA VETDB;

DROP DOMAIN IF EXISTS VETDB.SexType;
DROP TABLE IF EXISTS VETDB.Clinique;
DROP TABLE IF EXISTS VETDB.Personnel;
DROP TABLE IF EXISTS VETDB.Examen;
DROP TABLE IF EXISTS VETDB.Traitement;
DROP TABLE IF EXISTS VETDB.Animal;
DROP TABLE IF EXISTS VETDB.Proprietaire;
DROP TABLE IF EXISTS VETDB.Resultat;

CREATE DOMAIN VETDB.SexType AS CHAR
	CHECK(VALUE IN ('M','F'));

CREATE TABLE IF NOT EXISTS VETDB.Clinique(
	numero VARCHAR(10) NOT NULL,
	rue VARCHAR(20) NOT NULL,
	ville VARCHAR(20) NOT NULL,
	province VARCHAR(20) NOT NULL,
	codePostal VARCHAR(6) NOT NULL,
	gestionnaireNumero VARCHAR(10) NOT NULL,
	telecopieur VARCHAR(12) NOT NULL,
	telephone VARCHAR(12) NOT NULL,
	PRIMARY KEY(numero)
);

CREATE TABLE IF NOT EXISTS VETDB.Proprietaire(
	numero VARCHAR(10) NOT NULL,
	cliniqueNumero VARCHAR(10) NOT NULL,
	nom VARCHAR(20) NOT NULL,
	adresse VARCHAR(50) NOT NULL,
	telephone VARCHAR(10) NOT NULL,
	PRIMARY KEY(numero),
	FOREIGN KEY(cliniqueNumero) REFERENCES VETDB.Clinique(numero)
);

CREATE TABLE IF NOT EXISTS VETDB.Employe(
	numero VARCHAR(10) NOT NULL,
	cliniqueNumero VARCHAR(10) NOT NULL,
	nom VARCHAR(20) NOT NULL,
	prenom VARCHAR(20) NOT NULL,
	adresse VARCHAR(50) NOT NULL,
	telephone VARCHAR(10) NOT NULL,
	dateNaissance date NOT NULL,
	sexe SexType DEFAULT 'M',
	nas VARCHAR(11) UNIQUE NOT NULL,
	fonction VARCHAR(15) NOT NULL,
	salaire NUMERIC(10,0),
	PRIMARY KEY(numero)
);

CREATE TABLE IF NOT EXISTS VETDB.Veterinaire(
	numeroEmploye VARCHAR(10) NOT NULL UNIQUE,
	estEnService bool NOT NULL,
    PRIMARY KEY(numeroEmploye),
	FOREIGN KEY(numeroEmploye) REFERENCES VETDB.Employe(numero)
);

CREATE TABLE IF NOT EXISTS VETDB.Traitement(
	numero VARCHAR(10) NOT NULL,
	description VARCHAR(50) NOT NULL,
	cout NUMERIC(3,2) NOT NULL,
	PRIMARY KEY(numero)
);

CREATE TABLE IF NOT EXISTS VETDB.Animal(
	numero VARCHAR(10) NOT NULL UNIQUE,
	proprietaireNumero VARCHAR(10) NOT NULL,
	cliniqueNumero VARCHAR(10) NOT NULL,
	nom VARCHAR(20) NOT NULL,
	type VARCHAR(15) NOT NULL,
	description VARCHAR(50) NOT NULL,
	dateNaissance DATE NOT NULL,
	dateInscription DATE NOT NULL,
	etatActuel VARCHAR(15) NOT NULL,
	PRIMARY KEY(numero, proprietaireNumero),
	FOREIGN KEY(proprietaireNumero, cliniqueNumero) REFERENCES VETDB.Proprietaire(numero, cliniqueNumero)
);

CREATE TABLE IF NOT EXISTS VETDB.Examen(
	numero VARCHAR(10) NOT NULL,
	veterinaireNumero VARCHAR(10) NOT NULL,
	numeroAnimal VARCHAR(10) NOT NULL,
	date DATE NOT NULL,
	heure time NOT NULL,
	description VARCHAR(50) NOT NULL,
	PRIMARY KEY(numero),
	FOREIGN KEY(veterinaireNumero) REFERENCES VETDB.Veterinaire(numeroEmploye), 
	FOREIGN KEY(numeroAnimal) REFERENCES VETDB.Animal(numero)
);

CREATE TABLE IF NOT EXISTS VETDB.Prescription(
	numeroExamen VARCHAR(10) NOT NULL,
	numeroTraitement VARCHAR(10) NOT NULL,
	numeroAnimal VARCHAR(10) NOT NULL,
	qteTraitement NUMERIC(2,0) NOT NULL,
	dateDebut DATE NOT NULL,
	dateFin DATE NOT NULL,
	PRIMARY KEY(numeroExamen, numeroTraitement),
	FOREIGN KEY(numeroExamen, numeroAnimal) REFERENCES VETDB.Examen(numero, numeroAnimal),
	FOREIGN KEY(numeroTraitement) REFERENCES VETDB.Traitement(numero)
);

ALTER TABLE Clinique ADD CONSTRAINT cliniqueFK 
	FOREIGN KEY (gestionnaireNumero) REFERENCES Employe(numero);

ALTER TABLE Employe ADD CONSTRAINT employeFK 
	FOREIGN KEY (cliniqueNumero) REFERENCES Clinique(numero);

`;
