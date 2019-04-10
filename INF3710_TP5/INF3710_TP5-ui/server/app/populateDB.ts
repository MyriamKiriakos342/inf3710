export const data: string = `SET search_path = vetdb;
INSERT INTO vetdb.Employe(numero, cliniqueNumero, nom, prenom, adresse, telephone, dateNaissance, sexe, nas, fonction, salaire)
VALUES ('G9632', 'C476','Will', 'Tremblay', '34 rue Alpha', '453-653-2323', '1980-03-05', 'M', '463 564 643', 'Gestionnaire', '175000');
INSERT INTO vetdb.Employe(numero, cliniqueNumero, nom, prenom, adresse, telephone, dateNaissance, sexe, nas, fonction, salaire)
VALUES ('G9864', 'C456','Curie', 'Marie', '12 rue Brouhaha', '678-241-0785', '1967-10-10', 'F', '342 231 766', 'Gestionnaire', '180000');
INSERT INTO vetdb.Employe(numero, cliniqueNumero, nom, prenom, adresse, telephone, dateNaissance, sexe, nas, fonction, salaire)
VALUES ('G6523', 'C176','Bou', 'Bastien', '32 rue Foxtrot', '356-875-4563', '1989-01-23', 'M', '123 123 777', 'Gestionnaire', '200000');
--Clinique
INSERT INTO vetdb.Clinique(numero, rue, ville, province, codePostal, gestionnaireNumero, telecopieur, telephone)
VALUES ('C476', '6188 rue McDonald', 'Vancouver', 'Colombie-Britanique', 'h4o0d2', 'G6523', '315-543-6421', '234-786-7654');
INSERT INTO vetdb.Clinique(numero, rue, ville, province, codePostal, gestionnaireNumero, telecopieur, telephone) 
VALUES ('C456', '1234 rue Brave', 'Iqaluit', 'Nunavut', 'l3h8c8', 'G9864', '432-879-4378', '435-839-8279');
INSERT INTO vetdb.Clinique(numero, rue, ville, province, codePostal, gestionnaireNumero, telecopieur, telephone) 
VALUES ('C176', '879 ave Hiver', 'Montreal', 'Quebec', 'h3i0v7', 'G9632', '879-555-3434', '121-919-3565');
--Proprietaire
INSERT INTO vetdb.Proprietaire(numero, cliniqueNumero, nom, adresse, telephone)
VALUES ('P456', 'C176', 'Liliane Smith', '123 rue Bou Montreal Qc', '587-341-3426');
INSERT INTO vetdb.Proprietaire(numero, cliniqueNumero, nom, adresse, telephone)
VALUES ('P564', 'C456', 'Mouna Mouna', '456 rue Chat Iqaluit NU', '329-624-9632');
INSERT INTO VETDB.Proprietaire(numero, cliniqueNumero, nom, adresse, telephone)
VALUES ('P653', 'C476', 'Emilien Anon', '789 rue Chien Vancouver CB', '986-234-8342');
INSERT INTO VETDB.Proprietaire(numero, cliniqueNumero, nom, adresse, telephone)
VALUES ('P652', 'C176', 'Jean Michel Tremblay', '1 rue Chemin Qc', '018-369-8894');
INSERT INTO VETDB.Proprietaire(numero, cliniqueNumero, nom, adresse, telephone)
VALUES ('P651', 'C476', 'Marie Antartica', '1 Chemin de la Banquise Qc', '316-635-8987');
INSERT INTO VETDB.Proprietaire(numero, cliniqueNumero, nom, adresse, telephone)
VALUES ('P650', 'C476', 'Jean blayke Lassonde', '654 rue du Croissant', '514-514-5145');
--Employe
INSERT INTO VETDB.Employe(numero, cliniqueNumero, nom, prenom, adresse, telephone, dateNaissance, sexe, nas, fonction, salaire)
VALUES ('V754', 'C456','Sheep', 'Shawn', '89 rue Baleine', '876-366-2323', '1998-03-04', 'M', '647 436 436', 'Secretaire', '50000');
INSERT INTO VETDB.Employe(numero, cliniqueNumero, nom, prenom, adresse, telephone, dateNaissance, sexe, nas, fonction, salaire)
VALUES ('V635', 'C456','Sheen', 'Salome', '74 rue Lassonde', '475-742-8765', '1969-12-19', 'F', '577 774 574', 'Infirmiere', '70000');
INSERT INTO VETDB.Employe(numero, cliniqueNumero, nom, prenom, adresse, telephone, dateNaissance, sexe, nas, fonction, salaire)
VALUES ('V124', 'C476','Rand', 'Ralph', '65 rue Blast', '786-765-7665', '1978-10-28', 'M', '678 543 432', 'Secretaire', '40000');
INSERT INTO VETDB.Employe(numero, cliniqueNumero, nom, prenom, adresse, telephone, dateNaissance, sexe, nas, fonction, salaire)
VALUES ('E111', 'C476','Elph', 'Elsa', '90 rue Neige', '756-465-3452', '1967-06-06', 'F', '235 786 345', 'Infirmiere', '80000');
INSERT INTO VETDB.Employe(numero, cliniqueNumero, nom, prenom, adresse, telephone, dateNaissance, sexe, nas, fonction, salaire)
VALUES ('E500', 'C176','Red', 'Alissa', '65 rue St-Urbain', '765-654-6544', '1990-02-05', 'F', '765 465 222', 'Infirmiere', '100000');
INSERT INTO VETDB.Employe(numero, cliniqueNumero, nom, prenom, adresse, telephone, dateNaissance, sexe, nas, fonction, salaire)
VALUES ('V699', 'C176','Tremblay', 'Jean', '899 chemin Polytechnique', '305-897-4524', '1995-12-05', 'M', '789 857 987', 'Veterianaire', '900000');
--Veterinaire
INSERT INTO VETDB.Veterinaire(numeroEmploye, estEnService)
VALUES ('V754', true);
INSERT INTO VETDB.Veterinaire(numeroEmploye, estEnService)
VALUES ('V635', false);
INSERT INTO VETDB.Veterinaire(numeroEmploye, estEnService)
VALUES ('V124', false);
INSERT INTO VETDB.Veterinaire(numeroEmploye, estEnService)
VALUES ('V699', false);
--Animal
INSERT INTO VETDB.Animal(numero, proprietaireNumero, cliniqueNumero, nom, type, description, dateNaissance, dateInscription, etatActuel)
VALUES ('A532', 'P456', 'C176', 'Star', 'Chat','Sphinx sans condition preexistante', '2017-01-07', '2018-04-29', 'decede');
INSERT INTO VETDB.Animal(numero, proprietaireNumero, cliniqueNumero, nom, type, description, dateNaissance, dateInscription, etatActuel)
VALUES ('A533', 'P456', 'C176', 'Nebuleuse', 'Chien','chien bipolaire', '2018-04-29', '2018-04-30', 'vivant');
INSERT INTO VETDB.Animal(numero, proprietaireNumero, cliniqueNumero, nom, type, description, dateNaissance, dateInscription, etatActuel)
VALUES ('A087', 'P564','C456', 'Blue', 'Chien','Labrador avec haute tension', '2015-04-23', '2016-05-23', 'vivant');
INSERT INTO VETDB.Animal(numero, proprietaireNumero, cliniqueNumero, nom, type, description, dateNaissance, dateInscription, etatActuel)
VALUES ('A907', 'P653', 'C476', 'Silver', 'Serpent','probleme decailles', '2012-05-04', '2014-07-19', 'vivant');
INSERT INTO VETDB.Animal(numero, proprietaireNumero, cliniqueNumero, nom, type, description, dateNaissance, dateInscription, etatActuel)
VALUES ('A465', 'P653', 'C476', 'Grey', 'Serpent','avait un probleme decailles', '2011-05-04', '2012-05-04', 'decede');
INSERT INTO VETDB.Animal(numero, proprietaireNumero, cliniqueNumero, nom, type, description, dateNaissance, dateInscription, etatActuel)
VALUES ('A312', 'P651', 'C476', 'Magenta', 'Chevre','en bonne sante', '2010-01-01', '2010-01-02', 'vivant');
INSERT INTO VETDB.Animal(numero, proprietaireNumero, cliniqueNumero, nom, type, description, dateNaissance, dateInscription, etatActuel)
VALUES ('A315', 'P456', 'C176', 'Jaune', 'Serpent','est vegetarien', '2010-01-01', '2010-01-02', 'vivant');
INSERT INTO VETDB.Animal(numero, proprietaireNumero, cliniqueNumero, nom, type, description, dateNaissance, dateInscription, etatActuel)
VALUES ('A319', 'P650', 'C476', 'Bleu', 'Chat','pense qu il est un chien', '2000-5-24', '2002-06-09', 'vivant');
INSERT INTO VETDB.Animal(numero, proprietaireNumero, cliniqueNumero, nom, type, description, dateNaissance, dateInscription, etatActuel)
VALUES ('A321', 'P650', 'C476', 'Maron', 'Chien','convertit des chats en chien', '1995-01-01', '2015-04-23', 'vivant');
--Examen
INSERT INTO VETDB.Examen(numero, date, heure, description, veterinaireNumero, numeroAnimal)
VALUES ('EX3422', '2019-04-01','12:30', 'Examen apres traitement', 'V635', 'A532');
INSERT INTO VETDB.Examen(numero, date, heure, description, veterinaireNumero, numeroAnimal)
VALUES ('EX6543', '2019-02-17','8:30', 'Examen general', 'V635', 'A532');
INSERT INTO VETDB.Examen(numero, date, heure, description, veterinaireNumero, numeroAnimal)
VALUES ('EX6749', '2019-01-20','14:00', 'Examen general', 'V124', 'A087');
INSERT INTO VETDB.Examen(numero, date, heure, description, veterinaireNumero, numeroAnimal)
VALUES ('EX8765', '2016-05-17','17:30', 'Urgence', 'V754', 'A907');
--Traitement
INSERT INTO VETDB.Traitement(numero, description, cout)
VALUES ('T432', 'Bisoprolol 5mg tout les soirs avant de manger', 50);
INSERT INTO VETDB.Traitement(numero, description, cout)
VALUES ('T801', 'Ibuprofanimal 100mg a chaque heure', 25);
INSERT INTO VETDB.Traitement(numero, description, cout)
VALUES ('T365', 'Bandages, platre sur patte droite et advils', 200);
INSERT INTO VETDB.Traitement(numero, description, cout)
VALUES ('T909', 'Appliquer creme hydratante trois fois par jour', 754);
INSERT INTO VETDB.Traitement(numero, description, cout)
VALUES ('T100', 'Consultation generale', 20);
--Prescription
INSERT INTO VETDB.Prescription(numeroExamen, numeroTraitement, numeroAnimal, qteTraitement, dateDebut, dateFin)
VALUES ('EX3422', 'T432', 'A532', 30, '2017-10-30', '2017-11-30' );
INSERT INTO VETDB.Prescription(numeroExamen, numeroTraitement, numeroAnimal, qteTraitement, dateDebut, dateFin)
VALUES ('EX3422', 'T801', 'A532', 99, '2017-10-30', '2017-11-30' );
INSERT INTO VETDB.Prescription(numeroExamen, numeroTraitement, numeroAnimal, qteTraitement, dateDebut, dateFin)
VALUES ('EX3422', 'T100', 'A532', 1, '2017-10-30', '2017-11-30' );
INSERT INTO VETDB.Prescription(numeroExamen, numeroTraitement, numeroAnimal,qteTraitement, dateDebut, dateFin)
VALUES ('EX6543', 'T365', 'A532', 15, '2017-10-08', '2018-09-24' );
INSERT INTO VETDB.Prescription(numeroExamen, numeroTraitement, numeroAnimal,qteTraitement, dateDebut, dateFin)
VALUES ('EX6543', 'T100', 'A532', 1, '2017-10-08', '2018-09-24' );
INSERT INTO VETDB.Prescription(numeroExamen, numeroTraitement,numeroAnimal, qteTraitement, dateDebut, dateFin)
VALUES ('EX8765', 'T909', 'A907', 21, '2017-04-01', '2017-04-07' );
INSERT INTO VETDB.Prescription(numeroExamen, numeroTraitement,numeroAnimal, qteTraitement, dateDebut, dateFin)
VALUES ('EX8765', 'T100', 'A907', 1, '2017-04-01', '2017-04-07' );
ALTER TABLE VETDB.Employe ADD CONSTRAINT employeFK
	FOREIGN KEY (cliniqueNumero) REFERENCES VETDB.Clinique(numero);
ALTER TABLE VETDB.Clinique ADD CONSTRAINT cliniqueFK
	FOREIGN KEY (gestionnaireNumero) REFERENCES VETDB.Employe(numero);
`;
