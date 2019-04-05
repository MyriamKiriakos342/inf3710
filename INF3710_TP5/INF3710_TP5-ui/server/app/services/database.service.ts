import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import {schema} from "../createSchema";
import {data} from "../populateDB";

@injectable()
export class DatabaseService {

    // A MODIFIER POUR VOTRE BD
    public connectionConfig: pg.ConnectionConfig = {
        user: "sysadmin",
        database: "vet",
        password: "1234",
        port: 5433,
        host: "127.0.0.1",
        keepAlive : true
    };

    private pool: pg.Pool = new pg.Pool(this.connectionConfig);


    public createSchema(): Promise<pg.QueryResult> {
        this.pool.connect();

        return this.pool.query(schema);
    }

    public populateDb(): Promise<pg.QueryResult> {
        this.pool.connect();

        return this.pool.query(data);
    }

    public getAllFromTable(tableName: string): Promise<pg.QueryResult> {
        this.pool.connect();

        return this.pool.query(`SELECT * FROM VETDB.${tableName};`);
    }

    // Animal
    public getAnimals(): Promise<pg.QueryResult> {
        this.pool.connect();

        return this.pool.query('SELECT * FROM VETDB.Animal;');
    }

    public createAnimal(animalNo: string,
                       animalClinique: string,
                       animalProprietaire: string,
                       animalNom: string,
                       animalType: string,
                       animalDescription: string,
                       animalEtatActuel: string,
                       animalDateNaissance: string,
                       animalDateInscription: string): Promise<pg.QueryResult> {
        this.pool.connect();
        const values: string[] = [
            animalNo,
            animalClinique,
            animalProprietaire,
            animalNom,
            animalType,
            animalDescription,
            animalEtatActuel,
            animalDateNaissance,
            animalDateInscription
        ];
        const queryText: string = `INSERT INTO VETDB.Animal VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);`;

        return this.pool.query(queryText, values);
    }

}
