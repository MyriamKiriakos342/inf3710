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

        router.get("/animals",
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
                }).catch((erreur: unknown) => console.dir(erreur));
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
        router.get("/proprietaires/:cliniqueNumero",
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
        });
        router.get("/clinique",
                   (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                this.databaseService.getCliniques().then((result: pg.QueryResult) => {
                    const cliniques: Clinique[] = result.rows.map((clinique: any) => (
                        {
                            numero: clinique.numero,
                            rue: clinique.rue,
                            ville: clinique.ville,
                            province: clinique.province,
                            codePostal: clinique.codepostal,
                            gestionnaireNo: clinique.gestionnaireno,
                            telecopieur: clinique.telecopieur,
                            telephone: clinique.telephone,
                        }));
                    res.json(cliniques);
                });
            });
        router.delete("/animal/delete/:animalNo/:cliniqueNo",
                      (req: Request, res: Response, next: NextFunction) => {
                          this.databaseService.deleteAnimal(req.params.animalNo, req.params.cliniqueNo).then((result: pg.QueryResult) => {
                res.send();
                }

                );
            });
        router.get("/traitement/:animalNo/:cliniqueNumero",
                   (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.getTraitementsByAnimals(req.params.animalNo, req.params.cliniqueNumero).then((result: pg.QueryResult) => {
                    const prescriptions: Prescription[] = result.rows.map((prescription: any) => (
                        {
                            numero: prescription.numero,
                            description: prescription.description,
                            cout: prescription.cout,
                            numeroExamen: prescription.numeroexamen,
                            numeroAnimal: prescription.numeroanimal,
                            qteTraitement: prescription.qtetraitement,
                            dateDebut: prescription.datedebut,
                            dateFin: prescription.datefin,
                        }));
                    res.json(prescriptions);
                });
            });

        // ? not sure???
        router.put("/animal/modify/:animalNo/:cliniqueNumero",
                   (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.modifyAnimal(req.body).then((result: pg.QueryResult) => {
                    res.json(req.params.animal);
                });
            });

        router.post("/animal/insert",
                    (req: Request, res: Response, next: NextFunction) => {
                console.dir(req.body);
                this.databaseService.createAnimal(req.body as Animal).then((result: pg.QueryResult) => {
                    console.log("worked ", result.rowCount);
                    res.json(result.rowCount);
                }).catch((e: Error) => {
                    console.error(e.stack);
                    });
            });

        router.get("/animalSearch/:name",
                   (req: Request, res: Response, next: NextFunction) => {
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
                    res.send(animals);
                });
            });

        router.post("/animal/calculateBill",
                    (req: Request, res: Response, next: NextFunction) => {
                        console.dir(req.body);
                        this.databaseService.calculateBill(req.body as Animal).then((result: pg.QueryResult) => {
                    res.json(result.rows[0].sum);
                }).catch((e: Error) => {
                    console.error(e.stack);
                    });
            });

        return router;
    }
}
