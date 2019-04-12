import { Component, NgModule, OnInit } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { Animal } from "../../../../common/tables/Animal";
import { CommunicationService } from "../communication.service";
import { Router } from "@angular/router";
@NgModule({
  imports: [FlexLayoutModule],
})
@Component({
  selector: "app-animal",
  templateUrl: "./animal.component.html",
  styleUrls: ["./animal.component.css"]
})

export class AnimalComponent implements OnInit {

  public constructor(private communicationService: CommunicationService, private route: Router) {
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
  public modifyAnimal(e: MouseEvent): void {
    // const target: HTMLInputElement = e.target as HTMLInputElement;
    // if ( target !== null) {
    //   const parent: (Node & ParentNode) | null = target.parentNode;
    //   if (parent !== null) {
    //     const classes: string = (parent as HTMLInputElement).className;
    //     const numero: string = classes.substring(0, 4);
    //     const animal: Animal | undefined = this.animals.find((animalIndiv: Animal) => {
    //       return animalIndiv.numero === numero;
    //     });
    //     alert("Pour voir le tableau mis a jour, vous devez rafraichir votre page");
    //   }
    // }
  }

  public removeAnimal(e: MouseEvent): void {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    if ( target !== null) {
      const parent: (Node & ParentNode) | null = target.parentNode;
      if (parent !== null) {
        const classes: string = (parent as HTMLInputElement).className;
        const numero: string = classes.substring(0, 4);
        const animal: Animal | undefined = this.animals.find((animalIndiv: Animal) => {
          return animalIndiv.numero === numero;
        });
        this.communicationService.deleteAnimal((animal as Animal));
        alert("Pour voir le tableau mis a jour, vous devez rafraichir votre page");
      }
    }
  }

  public search(): void {
    this.communicationService.searchAnimals(this.searchName).subscribe((animals: Animal[]) => {
      console.log("Updated value of animals[] ",animals);
      this.animals = animals;
    });
  }

}
