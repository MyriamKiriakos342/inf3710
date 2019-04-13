import { Component, NgModule, OnInit } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { Router } from "@angular/router";
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

  public constructor(private communicationService: CommunicationService, private router: Router) {
    this.animals = [];
  }
  public longueurMax: number = 15;
  public duplicateError: boolean = false;
  public animals: Animal[];
  public searchName: string = "";
  public deleteAnimal: Animal;

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
                            cliniqueNumero: animalClinique,
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
  public reacheminementTraitement(animal: Animal): void {
    this.router.navigateByUrl("/traitement/" + animal.numero + "/" + animal.cliniqueNumero).catch((erreur: unknown) => {
        return console.dir("reacheminementTraitement ", erreur);
      });
  }
  public modifyAnimal(animal: Animal): void {
    this.router.navigateByUrl("/modification/" + animal.numero + "/" + animal.cliniqueNumero).catch(() => alert("Page introuvable"));
  }

  public removeAnimal(animal: Animal): void {
    this.deleteAnimal = animal;
    const dialog: HTMLElement | null = document.getElementById("success");
    if (dialog !== null) {
      dialog.style.display = "block";
    }

  }

  public yes(): void {
    this.communicationService.deleteAnimal(this.deleteAnimal.numero, this.deleteAnimal.cliniqueNumero).subscribe(() => {
          this.communicationService.getAnimals().subscribe((animals: Animal[]) => {
            this.animals = animals;
          });
        }
    );
    const dialog: HTMLElement | null = document.getElementById("success");
    if (dialog !== null) {
      dialog.style.display = "none";
    }
  }

  public no(): void {
    const dialog: HTMLElement | null = document.getElementById("success");
    if (dialog !== null) {
      dialog.style.display = "none";
    }
  }

  public search(): void {
    console.dir(this.searchName);
    this.communicationService.searchAnimals(this.searchName).subscribe((animals: Animal[]) => {
      console.log("Updated value of animals[] ", animals);
      this.animals = animals;
    });
  }

}
