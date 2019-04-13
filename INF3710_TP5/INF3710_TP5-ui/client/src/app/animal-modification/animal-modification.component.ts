import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Animal } from "../../../../common/tables/Animal";
import { Clinique } from "../../../../common/tables/Clinique";
import { Proprietaire } from "../../../../common/tables/Proprietaire";
import { CommunicationService } from "../communication.service";
@Component({
  selector: "app-animal-modification",
  templateUrl: "./animal-modification.component.html",
  styleUrls: ["./animal-modification.component.css"]
})
export class AnimalModificationComponent implements OnInit {
  public animals: Animal[];
  public animal: Animal;
  public cliniques: Clinique[] = [];
  public proprietaires: Proprietaire[] = [];

  public constructor(private communicationService: CommunicationService,
                     private route: ActivatedRoute,
                     private router: Router) {
                                      // tslint:disable-next-line:no-non-null-assertion
                      this.animal = {cliniqueNumero: this.route.snapshot.paramMap.get("cliniqueId")!,
                                     nom: "",
                                      // tslint:disable-next-line:no-non-null-assertion
                                     numero: this.route.snapshot.paramMap.get("animalId")!,
                                     dateInscription: null,
                                     dateNaissance: null,
                                     etatActuel: null,
                                     type: null,
                                     description: null,
                                     proprietaireNumero: null};
                     }

  public modifierAnimal(): void {

    const originalAnimal: Animal = this.animals.find((animal: Animal) => {
      return ((animal.numero === this.animal.numero) && (animal.cliniqueNumero === this.animal.cliniqueNumero));
    }) as Animal;

    if (this.animal.dateInscription === null) { this.animal.dateInscription = originalAnimal.dateInscription; }
    if (this.animal.nom === null) { this.animal.nom = originalAnimal.nom; }
    if (this.animal.dateNaissance === null) { this.animal.dateNaissance = originalAnimal.dateNaissance; }
    if (this.animal.etatActuel === null) { this.animal.etatActuel = originalAnimal.etatActuel; }
    if (this.animal.type === null) { this.animal.type = originalAnimal.type; }
    if (this.animal.description === null) { this.animal.description = originalAnimal.description; }
    if (this.animal.proprietaireNumero === null) { this.animal.proprietaireNumero = originalAnimal.proprietaireNumero; }

    this.communicationService.modifyAnimal(this.animal).subscribe((animalReceived: Animal) => {
      const success: HTMLElement | null = document.getElementById("success");
      if (success !== null) {
        success.style.display = "block";
        setTimeout(() => {
          success.style.display = "none";
        },         3000);
      }
    });
    this.router.navigateByUrl("animal").catch(() => alert("Page introuvable"));
  }

  public getAnimals(): void {

    this.communicationService.getAnimals().subscribe((animals: Animal[]) => {
      this.animals = animals;
    });
}

  public getClinique(): void {
    this.communicationService.getCliniques().subscribe((cliniques: Clinique[]) =>
    this.cliniques = cliniques);
  }

  public getProprietaire(): void {
    this.communicationService.getProprietaires().subscribe((proprietaires: Proprietaire[]) =>
    this.proprietaires = proprietaires);
  }

  public getProprietaireByClinique(): void {
    this.communicationService.getProprietaireByClinique(this.animal.cliniqueNumero).subscribe((proprio: Proprietaire[]) => {
      this.proprietaires = proprio;
      this.animal.proprietaireNumero = proprio[0].numero;
    });
  }

  public ngOnInit(): void {
    this.getAnimals();
    this.getClinique();
    this.getProprietaire();
  }
}
