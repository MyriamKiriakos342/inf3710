export interface Employe {
    numero: string,
    cliniqueNumero: string,
    nom: string,
    prenom: string,
    adresse: string,
    telephone: string,
    dateNaissance: Date,
    sexe: sexe,
    nas: string,
    fonction: string,
    salaire: number,
}
export interface Veterinaire {
    numeroEmploye: string,
    estEnService: boolean,
}

export enum sexe {
    F = "Femme",
    H = "Homme",
}