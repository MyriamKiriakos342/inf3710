import { Component } from "@angular/core";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-animal",
  templateUrl: "./animal.component.html",
  styleUrls: ["./animal.component.css"]
})

export class AnimalComponent {

  public constructor(private communicationService: CommunicationService) { }


  public duplicateError: boolean = false;

  public insertHotel(animalNo: string,
                     animalClinique: string,
                     animalProprietaire: string,
                     animalNom: string,
                     animalType: string,
                     animalDescription: string,
                     animalEtatActuel: string,
                     animalDateNaissance: string,
                     animalDateInscription: string): void {
    const animal: any = {"numero": animalNo,
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
}
