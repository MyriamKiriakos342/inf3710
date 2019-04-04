import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";

import { Animal } from "../../../common/tables/Animal";

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
                    const animals: Animal[] = result.rows.map((animal: any) => (
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

        router.post("/animal/insert",
                    (req: Request, res: Response, next: NextFunction) => {

                        const numero: string = req.body.animalNo;
                        const cliniqueNumero: string =  req.body.animalClinique;
                        const proprietaireNumero: string =  req.body.animalProprietaire;
                        const nom: string =  req.body.animalNom;
                        const type: string =  req.body.animalType;
                        const description: string =  req.body.animalDescription;
                        const etatActuel: string =  req.body.animalEtatActuel;
                        const dateNaissance: string =  req.body.animalDateNaissance;
                        const dateInscription: string =  req.body.animalDateInscription;

                        this.databaseService.createAnimal(numero,
                                                          cliniqueNumero,
                                                          proprietaireNumero,
                                                          nom,
                                                          type,
                                                          description,
                                                          etatActuel,
                                                          dateNaissance,
                                                          dateInscription).then((result: pg.QueryResult) => {
                        res.json(result.rowCount);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                        res.json(-1);
                    });
        });

        return router;
    }
}
