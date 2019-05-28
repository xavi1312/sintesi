import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscador'
})
export class BuscadorPipe implements PipeTransform {

  transform(tasques: any, buscador?: any): any {
    if(buscador == '') return tasques

    const resultatsBusqueda = [];
    for(const tasca of tasques){
      if(tasca.nom.toLowerCase().indexOf(buscador.toLowerCase()) > -1){
        resultatsBusqueda.push(tasca);
      }
    }
    return resultatsBusqueda;
  }

}
