import { Component, OnInit } from "@angular/core";
import { Animal } from "../../../../common/tables/Animal";
// import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-facture",
  templateUrl: "./facture.component.html",
  styleUrls: ["./facture.component.css"]
})
export class FactureComponent implements OnInit {
  public animal: Animal;

  public constructor(/*private communicationService: CommunicationService*/) {
  }

  public ngOnInit(): void {
    // this.communicationService.getAnimals(animal).subscribe();
  }

}
