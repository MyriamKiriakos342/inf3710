import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Animal } from "../../../../common/tables/Animal";

@Component({
  selector: "app-fiche-animal",
  templateUrl: "./fiche-animal.component.html",
  styleUrls: ["./fiche-animal.component.css"]
})
export class FicheAnimalComponent {
  @Input() public animal: Animal;
  public constructor(public router: Router) {
  }
  public accederInfo(animal: Animal): void {
    this.router.navigateByUrl("traitement/" + animal).catch((erreur: unknown) => {alert(erreur); });
  }

}
