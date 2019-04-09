import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";
import { Animal } from "../../../common/tables/Animal";
import { Clinique } from "../../../common/tables/Clinique";
import { Proprietaire } from "../../../common/tables/Proprietaire";
import { Traitement } from "../../../common/tables/Traitement";
import { DatabaseService } from "../services/database.service";
import Types from "../types";

@injectable()
export class DatabaseController {
    public constructor(@inject(Types.DatabaseService) private databaseService: DatabaseService) { }

    public get router(): Router {
        const router: Router = Router();

        router.post("/createSchema",
                    (req: Request, res: Response, next: NextFunction) => {
                    this.databaseService.createSchema().then((result: pg.QueryResult) => {
                        console.log("CECI EST UNE FONCTION DE TEST SEULEMENT");
                        res.json(result);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
                });

        router.post("/populateDb",
                    (req: Request, res: Response, next: NextFunction) => {
                    this.databaseService.populateDb().then((result: pg.QueryResult) => {
                        console.log("CECI EST UNE FONCTION DE TEST SEULEMENT");
                        res.json(result);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
        });

        router.get("/animal",
                   (req: Request, res: Response, next: NextFunction) => {
                    // Send the request to the service and send the response
                    this.databaseService.getAnimals().then((result: pg.QueryResult) => {
                    const animals: Animal[] = result.rows.map((animal: Animal) => (
                        {
                            numero: animal.numero,
                            cliniqueNumero: animal.cliniqueNumero,
                            proprietaireNumero: animal.proprietaireNumero,
                            nom: animal.nom,
                            type: animal.type,
                            description: animal.description,
                            etatActuel: animal.etatActuel,
                            dateNaissance: animal.dateNaissance,
                            dateInscription: animal.dateInscription
                    }));
                    res.json(animals);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });
        router.get("/proprietaire",
                   (req: Request, res: Response, next: NextFunction) => {
             // Send the request to the service and send the response
             this.databaseService.getProprietaires().then((result: pg.QueryResult) => {
             const proprietaires: Proprietaire[] = result.rows.map((proprietaire: Proprietaire) => (
                 {
                     numero: proprietaire.numero,
                     nom: proprietaire.nom,
                     cliniqueNo: proprietaire.cliniqueNo,
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
            this.databaseService.getProprietaires().then((result: pg.QueryResult) => {
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
            res.json(cliniques);
            }).catch((e: Error) => {
            console.error(e.stack);
            });
            });
        router.get("/animal/delete/:animal",
                   (req: Request, res: Response, next: NextFunction) => {
     this.databaseService.deleteAnimal(req.params.animal).catch((e: Error) => {
     console.error(e.stack);
     });
     });
        router.get("/traitment/:animalNo/:cliniqueNo",
                   (req: Request, res: Response, next: NextFunction) => {
            this.databaseService.getTraitementsByAnimals(req.params.animalNo, req.params.cliniqueNo).then((result: pg.QueryResult) => {
            const traitements: Traitement[] = result.rows.map((traitment: Traitement) => (
            {
                cout: traitment.cout,
                description: traitment.description,
                numero: traitment.numero,

            }));
            res.json(traitements);
            }).catch((e: Error) => {
            console.error(e.stack);
            });
            });

            // ? not sure???
        router.put("/animal/modify/:animal",
                   (req: Request, res: Response, next: NextFunction) => {
            const numero: string = req.params.numero;
            const proprietaireNumero: string =  req.params.animalProprietaire;
            const description: string =  req.params.animalDescription;
            const etatActuel: string =  req.params.animalEtatActuel;
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
                        const cliniqueNumero: string =  req.params.animalClinique;
                        const proprietaireNumero: string =  req.params.animalProprietaire;
                        const nom: string =  req.params.animalNom;
                        const type: string =  req.params.animalType;
                        const description: string =  req.params.animalDescription;
                        const etatActuel: string =  req.params.animalEtatActuel;
                        const dateNaissance: string =  req.params.animalDateNaissance;
                        const dateInscription: string =  req.params.animalDateInscription;

                        this.databaseService.createAnimal({ animalNo: numero, animalClinique: cliniqueNumero, animalProprietaire: proprietaireNumero, animalNom: nom, animalType: type, animalDescription: description, animalEtatActuel: etatActuel, animalDateNaissance: dateNaissance, animalDateInscription: dateInscription }).then((result: pg.QueryResult) => {
                        res.json(result.rowCount);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                        res.json(-1);
                    });
        });

        router.post("/animal/search/:name",
                    (req: Request, res: Response, next: NextFunction) => {
            this.databaseService.searchAnimal(name).then((result: pg.QueryResult) => {
            res.json();
        }).catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
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
