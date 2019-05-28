import { Pipe, PipeTransform } from '@angular/core';
import { Tasca } from 'src/app/classes/tasca/tasca';

@Pipe({
  name: 'ordenar'
})
export class OrdenarPipe implements PipeTransform {

  transform(etiquetes: any, stat: any, ascendent: Boolean): any {
    let etiquetesFiltrat = [];

    switch(stat){
      case 'nom'   : etiquetesFiltrat = etiquetes.sort( (a:Tasca, b:Tasca) => {return (a.nom < b.nom) ?  -1 :  1; });break;
      default       : etiquetesFiltrat = etiquetes.sort( (a:Tasca, b:Tasca) => {return (a._id < b._id) ?  -1 :  1; });break;
    }

    if(!ascendent) { return etiquetesFiltrat.reverse() }

    return etiquetesFiltrat;
  }

}
