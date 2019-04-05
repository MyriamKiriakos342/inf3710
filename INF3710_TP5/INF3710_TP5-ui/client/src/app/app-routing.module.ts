import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AnimalSupressionComponent } from "./animal-supression/animal-supression.component";
import { AnimalComponent } from "./animal/animal.component";
import { AppComponent } from "./app.component";
import { FactureComponent } from "./facture/facture.component";
import { RechercheNomComponent } from "./recherche-nom/recherche-nom.component";
import { TraitementComponent } from "./traitement/traitement.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "animal", component: AnimalComponent },
  { path: "traitement", component: TraitementComponent },
  { path: "rechercheNom", component: RechercheNomComponent },
  { path: "facture", component: FactureComponent },
  { path: "animalSupression", component: AnimalSupressionComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
