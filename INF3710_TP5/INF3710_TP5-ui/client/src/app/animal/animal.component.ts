import { Component, NgModule, OnInit } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { Router } from "@angular/router";
import { Animal } from "../../../../common/tables/Animal";
import { AnimalModificationComponent } from "../animal-modification/animal-modification.component";
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

  public constructor(private communicationService: CommunicationService, private route: Router, private dialog: MatDialog) {
    this.animals = [];
  }
  public longueurMax: number = 15;
  public duplicateError: boolean = false;
  public animals: Animal[];
  public searchName: string = "";

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
    this.route.navigateByUrl("/traitement/" + animal.numero + "/" + animal.cliniqueNumero).catch((erreur: unknown) => {
        return console.dir("reacheminementTraitement ", erreur);
      });
  }
  public modifyAnimal(animal: Animal): void {
    // this.communicationService.modifyAnimal(animal: Animal);
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.data = {animal: animal};

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(AnimalModificationComponent, dialogConfig);
  }

  public removeAnimal(animal: Animal): void {
    console.dir(animal);
    this.communicationService.deleteAnimal(animal.numero, animal.cliniqueNumero).subscribe(() => {
          this.communicationService.getAnimals().subscribe((animals: Animal[]) => {
            this.animals = animals;
            console.dir(animals);
          });
        }

        );

      }

  public search(): void {
    console.dir(this.searchName);
    this.communicationService.searchAnimals(this.searchName).subscribe((animals: Animal[]) => {
      console.log("Updated value of animals[] ", animals);
      this.animals = animals;
    });
  }

}
