import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Animal } from "../../../common/tables/Animal";
import {Clinique} from "../../../common/tables/Clinique";
import {Proprietaire} from "../../../common/tables/Proprietaire";
import {Traitement} from "../../../common/tables/Traitement";
// tslint:disable-next-line:ordered-imports
import { of, Observable, concat, Subject } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class CommunicationService {

    private readonly BASE_URL: string = "http://localhost:3000/database";
    public constructor(private http: HttpClient) { }

    private _listners: any = new Subject<any>();

    public listen(): Observable<any> {
       return this._listners.asObservable();
    }

    public filter(filterBy: string): void {
       this._listners.next(filterBy);
    }

    public getAnimals(): Observable<Animal[]> {

        return this.http.get<Animal[]>(this.BASE_URL + "/animal").pipe(
            catchError(this.handleError<Animal[]>()),
        );
    }
    public getProprietaires(): Observable<Proprietaire[]> {

        return this.http.get<Proprietaire[]>(this.BASE_URL + "/proprietaire").pipe(
            catchError(this.handleError<Proprietaire[]>()),
        );
    }
    public getCliniques(): Observable<Clinique[]> {
        return this.http.get<Clinique[]>(this.BASE_URL + "/clinique").pipe(
            catchError(this.handleError<Clinique[]>()),
        );
    }
    public getTraitementsByAnimals(animal: Animal): Observable<Traitement[]> {
        return this.http.get<Traitement[]>(this.BASE_URL + "/traitement" + "/" + animal.numero + "/" + animal.proprietaireNumero).pipe(
            catchError(this.handleError<Traitement[]>()),
            );
    }
    public insertAnimal(animal: Animal): Observable<number> {
        return this.http.post<number>(this.BASE_URL + "/animal/insert", animal).pipe(
            catchError(this.handleError<number>()));
    }
    public modifyAnimal(animal: Animal): Observable<Animal> {
        return this.http.put<Animal>(this.BASE_URL + "/animal/modify", animal).pipe(
            catchError(this.handleError<Animal>()),
            );
    }

    public searchAnimals(name: string): Observable<Animal[]> {

        return this.http.post<Animal[]>(this.BASE_URL + "/animal/search/", name).pipe(
            catchError(this.handleError<Animal[]>()),
        );
    }

    public deleteAnimal(): Observable<void> {
        return this.http.delete<void>(this.BASE_URL + "/animal/delete");
    }

    public getBill(animal: Animal): Observable<number> {

        return this.http.post<number>(this.BASE_URL + "/animal/search", animal).pipe(
            catchError(this.handleError<number>()),
        );
    }

    public setUpDatabase(): Observable<any> {
        return concat(this.http.post<any>(this.BASE_URL + "/createSchema", []),
                      this.http.post<any>(this.BASE_URL + "/populateDb", []));
    }

    private handleError<T>(result?: T): (error: Error) => Observable<T> {
        return (): Observable<T> => {
            return of(result as T);
        };
    }

}
