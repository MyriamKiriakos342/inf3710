import { Injectable } from "@angular/core";
import { Animal } from "../../../common/tables/Animal";
import { CommunicationService } from "./communication.service";

@Injectable({
  providedIn: "root",
})
export class FieldValidationService {

  public constructor(private communication: CommunicationService) { }

  public validateSelect(value: string): boolean {
    return value !== "";
  }

  public validateInput(value: string): boolean {
    return value.length < 10;
  }

  public validateDescription(value: string): boolean {
    return value.length > 0 && value.length < 50;
  }

  public validateAnimal(numero: string, cliniqueNo: string): boolean {
    let alreadyChosenValues: boolean = false;
    this.communication.getAnimals().subscribe((animals: Animal[]) => {
      animals.forEach((animal: Animal) => {
        if (animal.numero === numero && animal.cliniqueNumero === cliniqueNo) {
          alreadyChosenValues = true;
        }
      });
    });

    return alreadyChosenValues;
  }

  public validateDate(date: Date): boolean {
    return !date;
  }

  public validateInscripAfterBirth(inscription: Date, birth: Date): boolean {
    return inscription >= birth;
  }
}
