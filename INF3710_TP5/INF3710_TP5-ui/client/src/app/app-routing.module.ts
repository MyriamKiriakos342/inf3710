import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AjoutAnimalComponent } from "./ajout-animal/ajout-animal.component";
import { AnimalModificationComponent } from "./animal-modification/animal-modification.component";
import { AnimalComponent } from "./animal/animal.component";
import { AppComponent } from "./app.component";
import { TraitementComponent } from "./traitement/traitement.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "animal", component: AnimalComponent },
  { path: "traitement/:animalId/:cliniqueId", component: TraitementComponent },
  { path: "ajout", component: AjoutAnimalComponent },
  { path: "modification/:animalId/:cliniqueId", component: AnimalModificationComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
