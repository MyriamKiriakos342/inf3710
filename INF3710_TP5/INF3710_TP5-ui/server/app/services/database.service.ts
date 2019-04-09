import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import {schema} from "../createSchema";
import {data} from "../populateDB";
import { Animal } from "../../../common/tables/Animal";

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

    public constructor() {
        this.pool.connect().catch((erreur: unknown) => console.dir(erreur));
    }
    public async createSchema(): Promise<pg.QueryResult> {

        return this.pool.query(schema);
    }

    public async populateDb(): Promise<pg.QueryResult> {

        return this.pool.query(data);
    }

    public async getAllFromTable(tableName: string): Promise<pg.QueryResult> {

        return this.pool.query(`SELECT * FROM VETDB.${tableName};`);
    }

    // Animal
    public async getAnimals(): Promise<pg.QueryResult> {

        return this.pool.query(`SELECT * FROM VETDB.Animal;`);
    }
    public async getProprietaires(): Promise<pg.QueryResult> {

        return this.pool.query(`SELECT * FROM VETDB.Proprietaire;`);
    }

    public async getCliniques(): Promise<pg.QueryResult> {

        return this.pool.query(`SELECT * FROM VETDB.Clinique;`);
    }

    public async searchAnimal(name: string): Promise<pg.QueryResult> {

        return this.pool.query(`SELECT * FROM VETDB.Animal WHERE nom LIKE %name%;`);
    }
    public async deleteAnimal(animal: Animal): Promise<pg.QueryResult> {

        return this.pool.query(`DELETE FROM VETDB.Animal WHERE numero=${animal.numero} AND cliniqueNumero=${animal.cliniqueNumero};`);
    }
    public async getTraitementsByAnimals(animalNo: string, cliniqueNo: string): Promise<pg.QueryResult> {

        return this.pool.query(`SELECT p.*, t.* FROM VETDB.Prescription p, VETDB.Traitement t
                WHERE p.numeroAnimal = ${animalNo} AND t.numero = p.numeroTraitement AND ${cliniqueNo} =
                (SELECT cliniqueNo FROM animal WHERE numero=${animalNo});`);
    }
    public async calculateBill(animal: Animal): Promise<pg.QueryResult> {

        return this.pool.query(`SELECT SUM(cout) FROM VETDB.Traitement WHERE numero IN
        (SELECT numeroTraitement IN VETDB.Prescription WHERE numeroAnimal=${animal.numero}) AS sum);`);
    }

    public async createAnimal({ animalNo, animalClinique, animalProprietaire, animalNom, animalType, animalDescription, animalEtatActuel, animalDateNaissance, animalDateInscription }: { animalNo: string; animalClinique: string; animalProprietaire: string; animalNom: string; animalType: string; animalDescription: string; animalEtatActuel: string; animalDateNaissance: string; animalDateInscription: string; }): Promise<pg.QueryResult> {
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

    public async modifyAnimal({ animalNo, animalProprietaire, animalDescription, animalEtatActuel, }: { animalNo: string; animalProprietaire: string; animalDescription: string; animalEtatActuel: string; }): Promise<pg.QueryResult> {
        const values: string[] = [
            animalNo,
            animalProprietaire,
            animalDescription,
            animalEtatActuel,
        ];
        const queryText: string = `UPDATE VETDB.Animal SET description=${animalDescription}, etatActuel=${animalEtatActuel}
        WHERE numero=${animalNo} AND proprietaireNumero=${animalProprietaire};`;

        return this.pool.query(queryText, values);
    }

}
