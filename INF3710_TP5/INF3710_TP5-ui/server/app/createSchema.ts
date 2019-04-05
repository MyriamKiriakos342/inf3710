export const schema: string = `SET search_path = vetdb;

DROP SCHEMA IF EXISTS vetdb CASCADE;
CREATE SCHEMA vetdb;

DROP DOMAIN IF EXISTS vetdb.SexType;
DROP TABLE IF EXISTS vetdb.Clinique;
DROP TABLE IF EXISTS vetdb.Personnel;
DROP TABLE IF EXISTS vetdb.Examen;
DROP TABLE IF EXISTS vetdb.Traitement;
DROP TABLE IF EXISTS vetdb.Animal;
DROP TABLE IF EXISTS vetdb.Proprietaire;
DROP TABLE IF EXISTS vetdb.Resultat;

CREATE DOMAIN vetdb.SexType AS CHAR
	CHECK(VALUE IN ('M','F'));

CREATE TABLE IF NOT EXISTS vetdb.Clinique(
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

CREATE TABLE IF NOT EXISTS vetdb.Proprietaire(
	numero VARCHAR(10) NOT NULL,
	cliniqueNumero VARCHAR(10) NOT NULL,
	nom VARCHAR(20) NOT NULL,
	adresse VARCHAR(50) NOT NULL,
	telephone VARCHAR(15) NOT NULL,
	PRIMARY KEY(numero, cliniqueNumero),
	FOREIGN KEY(cliniqueNumero) REFERENCES vetdb.Clinique(numero)
);

CREATE TABLE IF NOT EXISTS vetdb.Employe(
	numero VARCHAR(10) NOT NULL,
	cliniqueNumero VARCHAR(10) NOT NULL,
	nom VARCHAR(20) NOT NULL,
	prenom VARCHAR(20) NOT NULL,
	adresse VARCHAR(50) NOT NULL,
	telephone VARCHAR(15) NOT NULL,
	dateNaissance date NOT NULL,
	sexe SexType DEFAULT 'M',
	nas VARCHAR(11) UNIQUE NOT NULL,
	fonction VARCHAR(15) NOT NULL,
	salaire NUMERIC(10,0),
	PRIMARY KEY(numero)
);

CREATE TABLE IF NOT EXISTS vetdb.Veterinaire(
	numeroEmploye VARCHAR(10) NOT NULL UNIQUE,
	estEnService bool NOT NULL,
    PRIMARY KEY(numeroEmploye),
	FOREIGN KEY(numeroEmploye) REFERENCES vetdb.Employe(numero)
);

CREATE TABLE IF NOT EXISTS vetdb.Traitement(
	numero VARCHAR(10) NOT NULL,
	description VARCHAR(50) NOT NULL,
	cout NUMERIC(7,2) NOT NULL,
	PRIMARY KEY(numero)
);

CREATE TABLE IF NOT EXISTS vetdb.Animal(
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
	FOREIGN KEY(proprietaireNumero, cliniqueNumero) REFERENCES vetdb.Proprietaire(numero, cliniqueNumero)
);

CREATE TABLE IF NOT EXISTS vetdb.Examen(
	numero VARCHAR(10) NOT NULL,
	veterinaireNumero VARCHAR(10) NOT NULL,
	numeroAnimal VARCHAR(10) NOT NULL,
	date DATE NOT NULL,
	heure time NOT NULL,
	description VARCHAR(50) NOT NULL,
	PRIMARY KEY(numero, numeroAnimal),
	FOREIGN KEY(veterinaireNumero) REFERENCES vetdb.Veterinaire(numeroEmploye), 
	FOREIGN KEY(numeroAnimal) REFERENCES vetdb.Animal(numero)
);

CREATE TABLE IF NOT EXISTS vetdb.Prescription(
	numeroExamen VARCHAR(10) NOT NULL,
	numeroTraitement VARCHAR(10) NOT NULL,
	numeroAnimal VARCHAR(10) NOT NULL,
	qteTraitement NUMERIC(2,0) NOT NULL,
	dateDebut DATE NOT NULL,
	dateFin DATE NOT NULL,
	PRIMARY KEY(numeroExamen, numeroTraitement),
	FOREIGN KEY(numeroExamen, numeroAnimal) REFERENCES vetdb.Examen(numero, numeroAnimal),
	FOREIGN KEY(numeroTraitement) REFERENCES vetdb.Traitement(numero)
);
`;
