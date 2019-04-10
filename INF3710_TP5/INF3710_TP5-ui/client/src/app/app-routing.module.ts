import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AjoutAnimalComponent } from "./ajout-animal/ajout-animal.component";
import { AnimalComponent } from "./animal/animal.component";
import { AppComponent } from "./app.component";
import { TraitementComponent } from "./traitement/traitement.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "animal", component: AnimalComponent },
  { path: "traitements/:animal", component: TraitementComponent },
  { path: "ajout", component: AjoutAnimalComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
