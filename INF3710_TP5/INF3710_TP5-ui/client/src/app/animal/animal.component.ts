import { Component, NgModule, OnInit } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { Animal } from "../../../../common/tables/Animal";
import { CommunicationService } from "../communication.service";
@NgModule({
  imports: [FlexLayoutModule],
})
@Component({
  selector: "app-animal",
  templateUrl: "./animal.component.html",
  styleUrls: ["./animal.component.css"]
})

export class AnimalComponent implements OnInit {

  public constructor(private communicationService: CommunicationService) {
    this.animals = [];
  }
  public longueurMax: number = 15;
  public duplicateError: boolean = false;
  public animals: Animal[];

  public insertAnimal(animalNo: string,
                      animalClinique: string,
                      animalProprietaire: string,
                      animalNom: string,
                      animalType: string,
                      animalDescription: string,
                      animalEtatActuel: string,
                      animalDateNaissance: Date,
                      animalDateInscription: Date): void {
    const animal: Animal = {"numero": animalNo,
                            cliniqueNo: animalClinique,
                            proprietaireNumero: animalProprietaire,
                            nom: animalNom,
                            type: animalType,
                            description: animalDescription,
                            etatActuel: animalEtatActuel,
                            dateNaissance: animalDateNaissance,
                            dateInscription: animalDateInscription
    };
    this.communicationService.insertAnimal(animal).subscribe((res: number) => {
        if (res > 0) {
            this.getAnimals();
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

  public search(): void {
    //const value = document.getElementById("input");
  }
}
