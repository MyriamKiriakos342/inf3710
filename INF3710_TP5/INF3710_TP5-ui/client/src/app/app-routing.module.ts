import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { AnimalComponent } from "./animal/animal.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "hotel", component: AnimalComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
