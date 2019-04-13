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
  public cout: number;
  public prescriptions: Prescription[];
  public constructor(private communicationService: CommunicationService,
                     private route: ActivatedRoute) { }

  public ngOnInit(): void {
      this.communicationService.getAnimalByKey(this.route.snapshot.paramMap.get("animalId")!,
                                               this.route.snapshot.paramMap.get("cliniqueId")!).subscribe((animal: Animal) => {
                                                 this.name = animal.nom as string;
                                                 this.communicationService.getTraitementsByAnimals(animal).subscribe((prescriptions: Prescription[]) => {
      this.prescriptions = prescriptions;
    });
                                                 this.communicationService.getBill(animal).subscribe((cout: number) => {
                                                  this.cout = cout;
    });
         });
     }
  }
