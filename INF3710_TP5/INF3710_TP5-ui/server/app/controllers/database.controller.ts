import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";
import { Animal } from "../../../common/tables/Animal";
import { Clinique } from "../../../common/tables/Clinique";
import { Prescription } from "../../../common/tables/Prescription";
import { Proprietaire } from "../../../common/tables/Proprietaire";
import { DatabaseService } from "../services/database.service";
import Types from "../types";

@injectable()
export class DatabaseController {
    public constructor(@inject(Types.DatabaseService) private databaseService: DatabaseService) { }

    public get router(): Router {
        const router: Router = Router();

        router.get("/animal",
                   (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                this.databaseService.getAnimals().then((result: pg.QueryResult) => {
                    const animals: Animal[] = result.rows.map((animal: any) => (
                        {
                            numero: animal.numero,
                            cliniqueNumero: animal.cliniquenumero,
                            proprietaireNumero: animal.proprietairenumero,
                            nom: animal.nom,
                            type: animal.type,
                            description: animal.description,
                            etatActuel: animal.etatactuel,
                            dateNaissance: animal.datenaissance,
                            dateInscription: animal.dateinscription,
                        }));
                    res.json(animals);
                    console.dir(res);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });
        router.get("/animal/:animalNo/:cliniqueNo",
                   (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                this.databaseService.getAnimalByKey(req.params.animalNo, req.params.cliniqueNo).then((result: pg.QueryResult) => {
                    const animals: Animal[] = result.rows.map((animal: any) => (
                        {
                            numero: animal.numero,
                            cliniqueNumero: animal.cliniquenumero,
                            proprietaireNumero: animal.proprietairenumero,
                            nom: animal.nom,
                            type: animal.type,
                            description: animal.description,
                            etatActuel: animal.etatactuel,
                            dateNaissance: animal.datenaissance,
                            dateInscription: animal.dateinscription,
                        }));
                    res.json(animals[0]);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });
        router.get("/proprietaire/init",
                   (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.getProprietaires().then((result: pg.QueryResult) => {
                    const proprietaires: Proprietaire[] = result.rows.map((proprietaire: Proprietaire) => (
                        {
                            numero: proprietaire.numero,
                            nom: proprietaire.nom,
                            cliniqueNumero: proprietaire.cliniqueNumero,
                            adresse: proprietaire.adresse,
                            telephone: proprietaire.telephone,
                        }));

                    res.json(proprietaires);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });
        /*
                router.get("/proprietaire/:cliniqueNumero",
                           (req: Request, res: Response, next: NextFunction) => {
                            console.dir("moi aussi");
                            this.databaseService.getProprietairesByClinique(req.params.cliniqueNumero).then((result: pg.QueryResult) => {
                            const proprietaires: Proprietaire[] = result.rows.map((proprietaire: Proprietaire) => (
           {
               numero: proprietaire.numero,
               nom: proprietaire.nom,
               cliniqueNumero: proprietaire.cliniqueNumero,
               adresse: proprietaire.adresse,
               telephone: proprietaire.telephone,
        }));

                            res.json(proprietaires);
        }).catch((e: Error) => {
        console.error(e.stack);
        });
        });*/
        router.get("/clinique",
                   (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                this.databaseService.getCliniques().then((result: pg.QueryResult) => {
                    const cliniques: Clinique[] = result.rows.map((clinique: Clinique) => (
                        {
                            numero: clinique.numero,
                            rue: clinique.rue,
                            ville: clinique.ville,
                            province: clinique.province,
                            codePostal: clinique.codePostal,
                            gestionnaireNo: clinique.gestionnaireNo,
                            telecopieur: clinique.telecopieur,
                            telephone: clinique.telephone,
                        }));
                    console.dir(cliniques);
                    res.json(cliniques);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });
        router.delete("/animal/delete/:animal",
                      (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.deleteAnimal(req.params.animal).catch((e: Error) => {
                    console.error(e.stack);
                });
            });
        router.get("/traitement/:animalNo/:cliniqueNumero",
                   (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.getTraitementsByAnimals(req.params.animalNo, req.params.cliniqueNumero).then((result: pg.QueryResult) => {
                    const prescriptions: Prescription[] = result.rows.map((prescription: Prescription) => (
                        {
                            numero: prescription.numero,
                            description: prescription.description,
                            cout: prescription.cout,
                            numeroExamen: prescription.numeroExamen,
                            numeroAnimal: prescription.numeroAnimal,
                            qteTraitement: prescription.qteTraitement,
                            dateDebut: prescription.dateDebut,
                            dateFin: prescription.dateFin,

                        }));
                    res.json(prescriptions);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });

        // ? not sure???
        router.put("/animal/modify/:animal",
                   (req: Request, res: Response, next: NextFunction) => {
                const numero: string = req.params.numero;
                const proprietaireNumero: string = req.params.animalProprietaire;
                const description: string = req.params.animalDescription;
                const etatActuel: string = req.params.animalEtatActuel;
                this.databaseService.modifyAnimal({ animalNo: numero, animalProprietaire: proprietaireNumero, animalDescription: description, animalEtatActuel: etatActuel }).then((result: pg.QueryResult) => {
                    res.json(req.params.animal);
                }).catch((e: Error) => {
                    console.error(e.stack);
                    res.json(-1);
                });
            });

        router.post("/animal/insert",
                    (req: Request, res: Response, next: NextFunction) => {

                const numero: string = req.params.animal.animalNo;
                const cliniqueNumero: string = req.params.animalClinique;
                const proprietaireNumero: string = req.params.animalProprietaire;
                const nom: string = req.params.animalNom;
                const type: string = req.params.animalType;
                const description: string = req.params.animalDescription;
                const etatActuel: string = req.params.animalEtatActuel;
                const dateNaissance: string = req.params.animalDateNaissance;
                const dateInscription: string = req.params.animalDateInscription;

                // tslint:disable-next-line:max-line-length
                this.databaseService.createAnimal({ animalNo: numero, animalClinique: cliniqueNumero, animalProprietaire: proprietaireNumero, animalNom: nom, animalType: type, animalDescription: description, animalEtatActuel: etatActuel, animalDateNaissance: dateNaissance, animalDateInscription: dateInscription }).then((result: pg.QueryResult) => {
                    console.log("worked ", result.rowCount);
                    res.json(result.rowCount);
                }).catch((e: Error) => {
                    console.error(e.stack);
                    res.json(-1);
                });
            });

        router.get("/animal/search/:name",
                   (req: Request, res: Response, next: NextFunction) => {
                console.log("DOESNT GET HERE SADLY");
                this.databaseService.searchAnimal(req.params.name).then((result: pg.QueryResult) => {
                    const animals: Animal[] = result.rows.map((animal: any) => (
                        {
                            numero: animal.numero,
                            cliniqueNumero: animal.cliniquenumero,
                            proprietaireNumero: animal.proprietairenumero,
                            nom: animal.nom,
                            type: animal.type,
                            description: animal.description,
                            etatActuel: animal.etatactuel,
                            dateNaissance: animal.datenaissance,
                            dateInscription: animal.dateinscription,
                        }));
                    res.json(animals);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });

        router.post("/animal/calculateBill/:animal",
                    (req: Request, res: Response, next: NextFunction) => {

                this.databaseService.calculateBill(req.params.animal).then((result: pg.QueryResult) => {
                    res.json(result.rows[0].sum);
                }).catch((e: Error) => {
                    console.error(e.stack);
                    res.json(-1);
                });
            });

        return router;
    }
}
