import { ModelHabitant} from "./HabitantInterface";


export class ModelSignal {
    _id : string
    criteres :Array<any> = [];
    descriptionProb : string;
    img: Array<any> = [];
    proprietaire_informe?: boolean;
    habitant_adulte: string | number;
    habitant_enfant?: string | number;
    surface_logement :string;
    habitant: ModelHabitant = new ModelHabitant();
}
