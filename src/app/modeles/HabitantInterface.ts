import { ModelAdresseHabitant} from "./HabitantAdresseInterface";

export class ModelHabitant {
    nom:string;
    prenom:string;
    email:string ="";
    tel?:number;
    adresse :ModelAdresseHabitant = new ModelAdresseHabitant();
}
