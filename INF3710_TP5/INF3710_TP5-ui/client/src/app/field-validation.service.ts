import { Injectable } from "@angular/core";
import { Animal } from "../../../common/tables/Animal";
import { CommunicationService } from "./communication.service";

@Injectable({
  providedIn: "root",
})
export class FieldValidationService {

  public constructor(private communication: CommunicationService) { }

  public validateSelect(value: string | null): boolean {
    return value !== "";
  }

  public validateInput(value: string): boolean {
    return ("" + value).length < 10 && ("" + value).length > 0;
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

    return !alreadyChosenValues;
  }

  public validateDate(date: Date | null): boolean {
    return !(date === null);
  }

  public validateInscripAfterBirth(inscription: Date | null, birth: Date | null): boolean {
    if (inscription !== null && birth !== null) {
    return inscription >= birth;
    }

    return false;

  }
}
