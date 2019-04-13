import { Component, OnInit } from "@angular/core";
import { Animal } from "../../../../common/tables/Animal";
import { Clinique } from "../../../../common/tables/Clinique";
import { Proprietaire } from "../../../../common/tables/Proprietaire";
import { CommunicationService } from "../communication.service";
import { FieldValidationService } from "../field-validation.service";

@Component({
  selector: "app-ajout-animal",
  templateUrl: "./ajout-animal.component.html",
  styleUrls: ["./ajout-animal.component.css"]
})

export class AjoutAnimalComponent implements OnInit {
  public cliniques: Clinique[];
  public proprietaires: Proprietaire[];
  public animal: Animal;
  public type: string;
  public erreur: {numero: boolean, clinique: boolean, proprio: boolean, numeroReplique: boolean
                  nom: boolean, type: boolean, description: boolean, dateInscription: boolean, etat: boolean,
                  dateNaissance: boolean, naissanceApresInscription: boolean };

  public constructor(private communicationService: CommunicationService,
                     private validate: FieldValidationService) {
    this.cliniques = [];
    this.proprietaires = [];
    this.animal = {cliniqueNumero: "", nom: "", numero: "", dateInscription: null,
                   dateNaissance: null, etatActuel: "", type: "", description: "",
                   proprietaireNumero: ""};
    this.erreur = {numero: false, naissanceApresInscription: false, numeroReplique: false, dateInscription: false, etat: false,
                   description: false, nom: false, dateNaissance: false, type: false, proprio: false, clinique: false};
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
    this.getClinique();
    this.getProprietaire();
  }

  public sendAnimal(): void {
    const animal: Animal = {
      cliniqueNumero: this.animal.cliniqueNumero,
      nom: this.animal.nom,
      type: this.animal.type,
      description: this.animal.description,
      etatActuel: this.animal.etatActuel,
      dateNaissance: this.animal.dateNaissance,
      dateInscription: this.animal.dateInscription,
      proprietaireNumero: this.animal.proprietaireNumero,
      numero: "A" + this.animal.numero,
    };
    this.validerTout();
    if (this.canInsert()) {
      this.communicationService.insertAnimal(animal).subscribe(() => {
      alert("animal ajoute!");
      const success: HTMLElement | null = document.getElementById("success");
      if (success !== null) {
        success.style.display = "block";
        setTimeout(() => {
          success.style.display = "none";
        },         3000);
      }

    });
}
  }
  public validerType(): void {
    this.erreur.type = !this.validate.validateSelect(this.animal.type!);
  }

  public validerDateInscription(): void {
    this.erreur.dateInscription = !this.validate.validateDate(this.animal.dateInscription!);
  }

  public validerDateNaissance(): void {
    this.erreur.dateNaissance = !this.validate.validateDate(this.animal.dateNaissance!);
  }
  public validerNom(): void {
    this.erreur.nom = !this.validate.validateInput(this.animal.nom!);
  }
  public validerNumero(): void {
    console.dir();
    this.erreur.numero = !this.validate.validateInput(this.animal.numero!);
  }
  public validerEtat(): void {
    this.erreur.etat = !this.validate.validateSelect(this.animal.etatActuel);
  }
  public validerDateInscriptionApresNaissance(): void {
    this.erreur.naissanceApresInscription =
    !this.validate.validateInscripAfterBirth(this.animal.dateInscription, this.animal.dateNaissance);
  }

  public validerNoAnimal(): void {
    this.erreur.numeroReplique = !this.validate.validateAnimal(this.animal.numero, this.animal.cliniqueNumero);
  }

  public validateDescription(): void {
    this.erreur.description = !this.validate.validateDescription(this.animal.description!);
  }

  public validateNoClinique(): void {
    this.erreur.clinique = !this.validate.validateSelect(this.animal.cliniqueNumero!);
  }

  public validateNoProprio(): void {
    this.erreur.proprio = !this.validate.validateSelect(this.animal.proprietaireNumero!);
  }

  public validerTout(): void {
    this.validerNumero();
    this.validateNoProprio();
    this.validateNoClinique();
    this.validateDescription();
    this.validerNoAnimal();
    this.validerDateInscriptionApresNaissance();
    this.validerType();
    console.dir(this.animal.etatActuel);
    this.validerDateInscription();
    this.validerDateNaissance();
    this.validerEtat();
    this.validerNom();
  }
  public canInsert(): boolean {
    return !(this.erreur.nom || this.erreur.numero || this.erreur.clinique ||
      this.erreur.dateInscription || this.erreur.dateNaissance || this.erreur.naissanceApresInscription ||
      this.erreur.description || this.erreur.etat || this.erreur.type || this.erreur.numeroReplique || this.erreur.proprio);
  }
}
