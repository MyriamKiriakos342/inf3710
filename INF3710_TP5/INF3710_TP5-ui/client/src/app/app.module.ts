import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AjoutAnimalComponent } from "./ajout-animal/ajout-animal.component";
import { AnimalModificationComponent } from './animal-modification/animal-modification.component';
import { AnimalComponent } from "./animal/animal.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./communication.service";
import { TraitementComponent } from "./traitement/traitement.component";

@NgModule({
  declarations: [
    AppComponent,
    AnimalComponent,
    TraitementComponent,
    AjoutAnimalComponent,
    AnimalModificationComponent,
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
    ReactiveFormsModule,
  ],
  providers: [CommunicationService, AnimalComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
