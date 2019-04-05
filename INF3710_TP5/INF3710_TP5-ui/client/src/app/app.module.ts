import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AnimalComponent } from "./animal/animal.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./communication.service";
import { FactureComponent } from "./facture/facture.component";
import { RechercheNomComponent } from "./recherche-nom/recherche-nom.component";
import { TraitementComponent } from "./traitement/traitement.component";
import { AnimalSupressionComponent } from './animal-supression/animal-supression.component';

@NgModule({
  declarations: [
    AppComponent,
    AnimalComponent,
    TraitementComponent,
    FactureComponent,
    RechercheNomComponent,
    AnimalSupressionComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [CommunicationService],
  bootstrap: [AppComponent],
})
export class AppModule { }
