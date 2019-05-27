import { Etiqueta } from '../etiqueta/etiqueta';

export class Tasca {
    _id: Number | String
    nom: String
    contingut: String
    acabat: Boolean
    alarma: Date
    etiquetes: Etiqueta[]
    
    constructor(){
        this.acabat = false;
        this.nom = 'Nova Tasca';
        this.etiquetes = [];
    }
}
