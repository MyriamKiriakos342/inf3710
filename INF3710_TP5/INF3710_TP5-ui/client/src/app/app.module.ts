import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AjoutAnimalComponent } from "./ajout-animal/ajout-animal.component";
import { AnimalComponent } from "./animal/animal.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./communication.service";
import { FicheAnimalComponent } from "./fiche-animal/fiche-animal.component";
import { TraitementComponent } from "./traitement/traitement.component";

@NgModule({
  declarations: [
    AppComponent,
    AnimalComponent,
    TraitementComponent,
    FicheAnimalComponent,
    AjoutAnimalComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,

  ],
  providers: [CommunicationService],
  bootstrap: [AppComponent],
})
export class AppModule { }
