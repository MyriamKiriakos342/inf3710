import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AnimalComponent } from "./animal/animal.component";
import { AppComponent } from "./app.component";
import { FactureComponent } from "./facture/facture.component";
import { TraitementComponent } from "./traitement/traitement.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "animal", component: AnimalComponent },
  { path: "traitement", component: TraitementComponent },
  { path: "facture", component: FactureComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
