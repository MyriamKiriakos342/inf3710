import { Component, HostListener, OnInit } from "@angular/core";
import { Animal } from "../../../../common/tables/Animal";
import { Clinique } from "../../../../common/tables/Clinique";
import { Proprietaire } from "../../../../common/tables/Proprietaire";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-animal",
  templateUrl: "./animal.component.html",
  styleUrls: ["./animal.component.css"]
})

export class AnimalComponent implements OnInit {

  public constructor(private communicationService: CommunicationService) { 
    this.animals = [];
    this.clinique = [];
    this.proprietaire = [];
  }
  public longueurMax: number = 15;
  public duplicateError: boolean = false;
  public animals: Animal[];
  public proprietaire: Proprietaire[];
  public clinique: Clinique[];

  // public vaidateanimalNo() {}
  // public validateanimalClinique() {}
  // public validateanimalProprietaire() {}
  // public validateanimalNom() {}
  // public validateanimalType() {}
  @HostListener("document:keydown.enter", ["$event"])
  public insertAnimal(animalNo: string,
                      animalClinique: string,
                      animalProprietaire: string,
                      animalNom: string,
                      animalType: string,
                      animalDescription: string,
                      animalEtatActuel: string,
                      animalDateNaissance: string,
                      animalDateInscription: string): void {
    const animal: Animal = {"numero": animalNo,
                            "cliniqueNumero": animalClinique,
                            "proprietaireNumero": animalProprietaire,
                            "nom": animalNom,
                            "type": animalType,
                            "description": animalDescription,
                            "etatActuel": animalEtatActuel,
                            "dateNaissance": animalDateNaissance,
                            "dateInscription": animalDateInscription
    };
    this.communicationService.insertAnimal(animal).subscribe((res: number) => {
        if (res > 0) {
            this.communicationService.filter("update");
        }
        this.duplicateError = (res === -1);
    });
  }
  public getAnimals(): void {

    this.communicationService.getAnimals().subscribe((animals: Animal[]) => {
        this.animals = animals;
    });
}

  public ngOnInit(): void {
    this.getAnimals();
  }
}
