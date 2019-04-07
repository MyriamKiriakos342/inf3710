import { Component, HostListener, OnInit } from "@angular/core";
import { Animal, AnimalPrimaryKey } from "../../../../common/tables/Animal";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-animal-supression",
  templateUrl: "./animal-supression.component.html",
  styleUrls: ["./animal-supression.component.css"]
})
export class AnimalSupressionComponent implements OnInit {
  public duplicateError: boolean = false;
  public longueurMax: number = 15;
  public ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  public constructor(private communicationService: CommunicationService) { }

  // public vaidateanimalNo() {}
  // public validateanimalClinique() {}
  // public validateanimalProprietaire() {}
  // public validateanimalNom() {}
  // public validateanimalType() {}
  @HostListener("document:keydown.enter", ["$event"])
  public deleteAnimal(animalNo: string,
                      animalProprietaire: string): void {
    const animal: AnimalPrimaryKey = {"numero": animalNo,
                                      "proprietaireNumero": animalProprietaire};
    this.communicationService.deleteAnimal(animal).subscribe((res: number) => {
        if (res > 0) {
            this.communicationService.filter("update");
        }
        this.duplicateError = (res === -1);
    });
  }

}
