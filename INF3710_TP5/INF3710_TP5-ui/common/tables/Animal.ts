export interface Animal extends AnimalPrimaryKey {
        "cliniqueNumero": string,
        "nom": string,
        "type": string,
        "description": string,
        "etatActuel": string,
        "dateNaissance": string,
        "dateInscription": string
}

export interface AnimalPrimaryKey {
        "numero": string,
        "proprietaireNumero": string,
}