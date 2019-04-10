import { Component, Input } from "@angular/core";
import { Animal } from "../../../../common/tables/Animal";

@Component({
  selector: "app-fiche-animal",
  templateUrl: "./fiche-animal.component.html",
  styleUrls: ["./fiche-animal.component.css"]
})
export class FicheAnimalComponent {
  @Input() public animal: Animal;
  public ngInit(): void {
    console.dir(this.animal);
  }

}
