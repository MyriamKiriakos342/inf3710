export interface Animal extends AnimalPrimaryKey {
        cliniqueNo: string,
        nom: string,
        type: string,
        description: string,
        etatActuel: string,
        dateNaissance: Date,
        dateInscription: Date,
}

export interface AnimalPrimaryKey {
        numero: string,
        proprietaireNumero: string,
}