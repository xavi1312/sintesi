import { Etiqueta } from '../etiqueta/etiqueta';

export class Tasca {
    nom: String
    contingut: String
    acabat: Boolean
    alarma: Date
    etiquetes: Etiqueta[]
    
    constructor(){
        this.acabat = false;
    }
}
