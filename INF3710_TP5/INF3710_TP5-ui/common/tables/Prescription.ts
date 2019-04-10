import { Traitement } from "./Traitement";

export interface Prescription extends Traitement {
    numeroExamen: string,
    numeroAnimal: string,
    qteTraitement: number,
    dateDebut: Date,
    dateFin: Date,
}
