import { Etiqueta } from '../etiqueta/etiqueta';

export class Tasca {
    _id: Number | String
    nom: String
    contingut: String
    acabada: Boolean
    alarma: Date
    etiquetes: Etiqueta[]
    
    constructor(){
        this.acabada = false;
        this.nom = 'Nova Tasca';
        this.etiquetes = [];
    }
}
