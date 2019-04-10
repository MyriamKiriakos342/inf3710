import { Component, OnInit } from "@angular/core";
import { Prescription } from "../../../../common/tables/Prescription";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-traitement",
  templateUrl: "./traitement.component.html",
  styleUrls: ["./traitement.component.css"]
})

export class TraitementComponent implements OnInit {
  public longueurMax: number = 15;
  public name: string;
  public prescriptions: Prescription[];
  public constructor(private communicationService: CommunicationService) { }

  public ngOnInit(): void {
    this.communicationService.getTraitementsByAnimals(name).subscribe((prescriptions: Prescription[]) =>
     {this.prescriptions = prescriptions; });
  }
  }