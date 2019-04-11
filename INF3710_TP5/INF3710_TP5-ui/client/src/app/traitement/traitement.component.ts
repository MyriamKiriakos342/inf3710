import { Component, OnInit } from "@angular/core";
import { Prescription } from "../../../../common/tables/Prescription";
import { CommunicationService } from "../communication.service";
import { AnimalComponent } from "../animal/animal.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-traitement",
  templateUrl: "./traitement.component.html",
  styleUrls: ["./traitement.component.css"]
})

export class TraitementComponent implements OnInit {
  public longueurMax: number = 15;
  public name: string;
  public prescriptions: Prescription[];
  public constructor(private communicationService: CommunicationService, private contactService: AnimalComponent, 
                     private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params:any) => {
      console.log(params.get("animalId"));
      console.log(params.get("cliniqueId"));
      this.communicationService.getTraitementsByAnimals(name).subscribe((prescriptions: Prescription[]) =>
     {this.prescriptions = prescriptions; });
     });
    
  }
  }
