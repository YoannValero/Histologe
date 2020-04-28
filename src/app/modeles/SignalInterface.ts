import { ModelHabitant} from "./HabitantInterface";


export class ModelSignal {

    criteres :Array<any>= [];
    descriptionProb : string;
    img: Array<any> = [];
    proprietaire_informe?: boolean;
    habitant_adulte?: number;
    habitant_enfant?: number;
    surface_logement :string;
    habitant: ModelHabitant = new ModelHabitant();

}
