import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Animal } from "../../../../common/tables/Animal";
import { CommunicationService } from "../communication.service";
@Component({
  selector: "app-animal-modification",
  templateUrl: "./animal-modification.component.html",
  styleUrls: ["./animal-modification.component.css"]
})
export class AnimalModificationComponent {
  public animal: Animal;

  public constructor(
    private communicationService: CommunicationService,
    private dialogRef: MatDialogRef<AnimalModificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Animal) {
      this.animal = data;
     }

  public fermer(): void {
    this.dialogRef.close();
  }

  public modifierAnimal(animal: Animal): void {
    this.communicationService.modifyAnimal(animal).subscribe((animal: Animal) => {
      this.dialogRef.close();
    });
  }
}
