import { Pipe, PipeTransform } from '@angular/core';
import { Tasca } from 'src/app/classes/tasca/tasca';
import * as moment from 'moment';
import { Etiqueta } from 'src/app/classes/etiqueta/etiqueta';

@Pipe({
  name: 'ordenar'
})
export class OrdenarPipe implements PipeTransform {
  transform(tasques: Tasca[], ascendent: Boolean, estat: any, data: String, etiquetesFiltre: String[]): any {
    let tasquesFiltrat = tasques;

    if(data != null) tasquesFiltrat = tasquesFiltrat.filter(tasca => this.filtreData(tasca.alarma, data))
    
    // Filtre les tasques que contenen una de les etiquetes del filtre
    if(etiquetesFiltre.length != 0) {
      tasquesFiltrat = tasquesFiltrat.filter(tasca => {
        const etiquetes = tasca.etiquetes;
        if(etiquetes.length == 0) return false

        return etiquetes.some(et => etiquetesFiltre.indexOf(et.nom) >= 0)
      })
    }
    switch(estat){
      case 'nom'    : tasquesFiltrat = tasquesFiltrat.sort( (a:Tasca, b:Tasca) => {return (a.nom < b.nom) ?  -1 :  1; });break;
      default       : tasquesFiltrat = tasquesFiltrat.sort( (a:Tasca, b:Tasca) => {return (a._id < b._id) ?  -1 :  1; });break;
    }

    if(ascendent) { return tasquesFiltrat.reverse() }

    return tasquesFiltrat;
  }
  private filtreData(alarma: string | Date, abansDe: string | Date | any) {
    
    if(alarma != undefined) {
      let abans = moment(alarma).format('YYYY-MM-DD')
      let despres = moment(abansDe).format('YYYY-MM-DD')
      return (moment(abans).isSameOrBefore(despres) && alarma != undefined)
    }
    return false
  }
}
