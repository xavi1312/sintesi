import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TascaService } from 'src/app/serveis/tasca/tasca.service';
import { Observable } from 'rxjs';
import { Tasca } from 'src/app/classes/tasca/tasca';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { GestorErrorsService } from 'src/app/serveis/gestorErrors/gestor-errors.service';
import { Globals } from 'src/app/variablesGlobals';
import { share, map } from 'rxjs/operators';
import * as moment from 'moment';
import { Etiqueta } from 'src/app/classes/etiqueta/etiqueta';
import { EtiquetaService } from 'src/app/serveis/etiqueta/etiqueta.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-tasques',
  templateUrl: './tasques.component.html',
  styleUrls: ['./tasques.component.scss']
})
export class TasquesComponent implements OnInit {
  tasques$: Observable<Tasca[]>;
  etiquetes: Etiqueta;
  isParametre: Boolean;
  tempsAvis: number;

  etiquetesFiltre = '';
  dataFiltre = null;
  invertirOrdreFiltre = false;
  estat = 'asd';

  invertirFiltre() {
    this.invertirOrdreFiltre = !this.invertirOrdreFiltre;
  }
  constructor(private globals: Globals, private _route: ActivatedRoute, private _router: Router, private _tasquaService: TascaService, private _snackBar: MatSnackBar, private _gestorErrors: GestorErrorsService, private _etiquetesService: EtiquetaService) {
    this._gestorErrors.getErrorTasques().subscribe(missatge => this.openSnackBar(missatge));
    this._etiquetesService.getEtiquetes().subscribe()
    this._etiquetesService.etiquetes$.subscribe(res => this.etiquetes = res);
    this.tempsAvis = this.globals.tempsNotificacions;

    (_route.snapshot.paramMap.get("data")) ? this.isParametre = true : this.isParametre = false;
  }

  ngOnInit() {
    this._tasquaService.getTasques().subscribe()
    if(this.isParametre) {
      const param = this._route.snapshot.paramMap.get("data");
      
      const data = (param === 'avui') ? moment().startOf('day') : moment().add(7, 'days')
      
      this.tasques$ = this._tasquaService.tasques$.pipe(map(tasques => tasques.filter(tasca =>  this.filtreData(tasca.alarma, data)) ), share())

    } else {
      this.tasques$ = this._tasquaService.tasques$;
    }
  }

  novaTasca() {
    this._router.navigateByUrl('tasca');
  }


  openSnackBar(missatge: string, accio?: string) {
    if(!accio) accio = 'Dacord'
    if(missatge || missatge != '') {
      this._snackBar.open(missatge, accio, {
        duration: this.tempsAvis,
      });
    }
  }

  private filtreData(alarma: string | Date, abansDe: string | Date | any) {
    
    if(alarma != undefined) {
      let abans = moment(alarma).format('YYYY-MM-DD')
      let despres = moment(abansDe).format('YYYY-MM-DD')
      return (moment(abans).isSameOrBefore(despres) && alarma != undefined)
    }
    return false
  }

  compareFn(etiqueta1: Etiqueta, etiqueta2: Etiqueta) {
    return etiqueta1 && etiqueta2 ? etiqueta1._id === etiqueta2._id : etiqueta1 === etiqueta2;
  }
}
