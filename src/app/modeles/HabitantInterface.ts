export interface ModelHabitant {
    nom:string,
    prenom:string,
    email:string,
    tel:number,
    adresse: {
        numero:number;
        rue:string,
        etage?:string,
        num_appart?:string,
        code_postal:number,
        ville:string
    }
}
