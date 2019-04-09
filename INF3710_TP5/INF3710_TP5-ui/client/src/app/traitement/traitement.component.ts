import { Component, HostListener, OnInit } from "@angular/core";
import { Traitement } from "../../../../common/tables/Traitement";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-traitement",
  templateUrl: "./traitement.component.html",
  styleUrls: ["./traitement.component.css"]
})

export class TraitementComponent implements OnInit {
  public longueurMax: number = 15;
  public name: string;
  public treatments: Traitement[];
  public constructor(private communicationService: CommunicationService) { }
  @HostListener("document:keypress.enter",  ["$event"])
    public pressEnter(event: KeyboardEvent): void {
      event.preventDefault();
      this.searchTreatements();
    }

  ngOnInit() {
  }
  public searchTreatements() {
    this.communicationService.getTraitementsByAnimals(name).subscribe((treatments: Traitement[]) => {this.treatments = treatments; });
  }
}
