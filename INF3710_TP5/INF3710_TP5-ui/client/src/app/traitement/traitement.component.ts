import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Animal } from "../../../../common/tables/Animal";
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
  public constructor(private communicationService: CommunicationService,
                     private route: ActivatedRoute) { }

  public ngOnInit(): void {
      console.dir(this.route.snapshot.paramMap);
      this.communicationService.getAnimalByKey(this.route.snapshot.paramMap.get("animalId")!,
                                               this.route.snapshot.paramMap.get("cliniqueId")!).subscribe((animal: Animal) => {
                                                 console.dir(animal);
                                                 this.name = animal.nom;
                                                 this.communicationService.getTraitementsByAnimals(animal).subscribe((prescriptions: Prescription[]) => {
      console.dir(prescriptions);
      this.prescriptions = prescriptions; });
         });
     }
  }
