import { Component, OnInit } from "@angular/core";
import { Clinique } from "../../../../common/tables/Clinique";
import { Proprietaire } from "../../../../common/tables/Proprietaire";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-ajout-animal",
  templateUrl: "./ajout-animal.component.html",
  styleUrls: ["./ajout-animal.component.css"]
})
export class AjoutAnimalComponent implements OnInit {
  public cliniques: Clinique[];
  public proprietaires: Proprietaire[];

  public constructor(private communicationService: CommunicationService) {
    this.cliniques = [];
    this.proprietaires = [];
  }

  public getClinique(): void {
    this.communicationService.getCliniques().subscribe((cliniques: Clinique[]) =>
    this.cliniques = cliniques);
  }

  public getProprietaire(): void {
    this.communicationService.getProprietaires().subscribe((proprietaires: Proprietaire[]) =>
    this.proprietaires = proprietaires);
  }
  public ngOnInit(): void {
    this.getClinique();
    this.getProprietaire();
  }

}
