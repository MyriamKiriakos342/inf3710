import { Component, OnInit } from "@angular/core";
import { Animal } from "../../../../common/tables/Animal";
import { Clinique } from "../../../../common/tables/Clinique";
import { Proprietaire } from "../../../../common/tables/Proprietaire";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-ajout-animal",
  templateUrl: "./ajout-animal.component.html",
  styleUrls: ["./ajout-animal.component.css"]
})

export class AjoutAnimalComponent implements OnInit {
  public cliniques: Clinique[];
  public proprietaires: Proprietaire[];
  public animal: Animal;
  public type: string;

  public constructor(private communicationService: CommunicationService) {
    this.cliniques = [];
    this.proprietaires = [];
    this.animal = {cliniqueNumero: "", nom: "", numero: "", dateInscription: new Date(),
                   dateNaissance: new Date(), etatActuel: "decede", type: "", description: "",
                   proprietaireNumero: ""};
  }

  public getClinique(): void {
    this.communicationService.getCliniques().subscribe((cliniques: Clinique[]) =>
    this.cliniques = cliniques);
  }

  public getProprietaire(): void {
    this.communicationService.getProprietaires().subscribe((proprietaires: Proprietaire[]) =>
    this.proprietaires = proprietaires);
  }

  public getProprietaireByClinique(): void {
    this.communicationService.getProprietaireByClinique(this.animal.cliniqueNumero).subscribe((proprio: Proprietaire[]) => {
      this.proprietaires = proprio;
      this.animal.proprietaireNumero = proprio[0].numero;
    });
  }

  public ngOnInit(): void {
    this.getClinique();
    this.getProprietaire();
  }

  public consoleProprio(): void {
    console.dir(this.animal.proprietaireNumero);
  }
  public addAnimal(): void {
    const animal: Animal = {
      cliniqueNumero: this.animal.cliniqueNumero,
      nom: this.animal.nom,
      type: this.animal.type,
      description: this.animal.description,
      etatActuel: this.animal.etatActuel,
      dateNaissance: this.animal.dateNaissance,
      dateInscription: this.animal.dateInscription,
      proprietaireNumero: this.animal.proprietaireNumero,
      numero: "A" + this.animal.numero,
    };

    console.dir(animal);
    this.communicationService.insertAnimal(animal).subscribe(() => {
      alert("animal ajoute!");
      this.communicationService.getAnimals().subscribe((animals: Animal[]) => {
        console.dir(animals);
      });
    });
  }

}
