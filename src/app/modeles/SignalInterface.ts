import { ModelHabitant} from "./HabitantInterface";

export interface ModelSignal {
    criteres: string,
    descriptionProb :string,
    img: string,
    proprietaire_informe:boolean,
    habitant_adulte:number,
    habitant_enfant?:number,
    surface_logement:string,
    habitant: ModelHabitant
}
