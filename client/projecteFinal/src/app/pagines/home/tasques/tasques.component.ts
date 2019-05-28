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

@Component({
  selector: 'app-tasques',
  templateUrl: './tasques.component.html',
  styleUrls: ['./tasques.component.scss']
})
export class TasquesComponent implements OnInit {
  tasques$: Observable<Tasca[]>;
  isParametre: Boolean;

  constructor(private globals: Globals, private _route: ActivatedRoute, private _router: Router, private _tasquaService: TascaService, private _snackBar: MatSnackBar, private _gestorErrors: GestorErrorsService) {
    this._gestorErrors.getErrorTasques().subscribe(missatge => this.openSnackBar(missatge));

    (_route.snapshot.paramMap.get("data")) ? this.isParametre = true : this.isParametre = false;
  }

  ngOnInit() {
    this._tasquaService.getTasques().subscribe()
    if(this.isParametre) {
      const param = this._route.snapshot.paramMap.get("data");
      
      const data = (param === 'avui') ? moment().add(1, 'day').toString() : moment().add(7, 'days').toString()
      
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
    if(missatge) {
      this._snackBar.open(missatge, accio, {
        duration: this.globals.tempsNotificacions,
      });
    }
  }

  private filtreData(alarma: string | Date, abansDe: string) {

    if(alarma != undefined) {
      const alarmaString = moment(alarma).toString()
      
      return (moment(alarma).isBefore(abansDe) && alarma != undefined)
    }
    return false
  }
}
