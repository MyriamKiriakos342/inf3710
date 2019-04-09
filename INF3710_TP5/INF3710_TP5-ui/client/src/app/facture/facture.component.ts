import { Component, OnInit } from "@angular/core";
import { Animal } from "../../../../common/tables/Animal";
import { Clinique } from "../../../../common/tables/Clinique";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-facture",
  templateUrl: "./facture.component.html",
  styleUrls: ["./facture.component.css"]
})
export class FactureComponent implements OnInit {
  public cliniques: Clinique[];
  public animals: Animal[];

  public constructor(private communicationService: CommunicationService) {
    this.animals = [];
    this.cliniques = [];
  }

  public ngOnInit(): void {
    this
  }

}
