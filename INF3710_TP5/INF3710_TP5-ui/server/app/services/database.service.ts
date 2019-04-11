import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
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

    // Animal
    public async getAnimals(): Promise<pg.QueryResult> {

        return this.pool.query(`SELECT * FROM vetdb.animal;`);
    }
    public async getProprietaires(): Promise<pg.QueryResult> {

        return this.pool.query(`SELECT * FROM vetdb.proprietaire;`);
    }
    /*public async getProprietairesByClinique(cliniqueNumero: string): Promise<pg.QueryResult> {

        return this.pool.query(`SELECT * FROM vetdb.Proprietaire WHERE ${cliniqueNumero} = cliniqueNumero;`);
    }*/
    public async getCliniques(): Promise<pg.QueryResult> {

        return this.pool.query(`SELECT * FROM vetdb.clinique;`);
    }

    public async getAnimalByKey(animalNo: string, cliniqueNo: string): Promise<pg.QueryResult> {

        return this.pool.query(`SELECT * FROM vetdb.animal WHERE ${animalNo}= numero AND ${cliniqueNo}=cliniqueNumero;`);
    }

    public async searchAnimal(name: string): Promise<pg.QueryResult> {

        return this.pool.query(`SELECT * FROM vetdb.animal WHERE nom LIKE '%${name}%';`);
    }
    public async deleteAnimal(animal: Animal): Promise<pg.QueryResult> {

        return this.pool.query(`DELETE FROM vetdb.animal WHERE numero=${animal.numero} AND cliniquenumero=${animal.cliniqueNumero};`);
    }
    public async getTraitementsByAnimals(animalNo: string, cliniqueNumero: string): Promise<pg.QueryResult> {

        return this.pool.query(`SELECT p.*, t.*
        FROM vetdb.Pescription p
        LEFT OUTER JOIN vetdb.Traitement t ON (p.numerotraitement  = t.numero)
        WHERE p.numeroanimal = ${animalNo} AND ${cliniqueNumero} IN (SELECT cliniquenumero FROM animal WHERE ${animalNo} = numero);`);

    }
    public async calculateBill(animal: Animal): Promise<pg.QueryResult> {

        return this.pool.query(`SELECT SUM(cout) FROM vetdb.traitement WHERE numero IN
        (SELECT numerotraitement IN vetdb.prescription WHERE numeroanimal=${animal.numero}) AS sum);`);
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
        const queryText: string = `INSERT INTO vetdb.animal VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);`;

        return this.pool.query(queryText, values);
    }

    public async modifyAnimal({ animalNo, animalProprietaire, animalDescription, animalEtatActuel, }: { animalNo: string; animalProprietaire: string; animalDescription: string; animalEtatActuel: string; }): Promise<pg.QueryResult> {
        const values: string[] = [
            animalNo,
            animalProprietaire,
            animalDescription,
            animalEtatActuel,
        ];
        const queryText: string = `UPDATE vetdb.animal SET description=${animalDescription}, etatactuel=${animalEtatActuel}
        WHERE numero=${animalNo} AND proprietairenumero=${animalProprietaire};`;

        return this.pool.query(queryText, values);
    }

}
