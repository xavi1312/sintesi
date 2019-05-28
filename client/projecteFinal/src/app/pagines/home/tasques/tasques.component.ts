import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TascaService } from 'src/app/serveis/tasca/tasca.service';
import { Observable } from 'rxjs';
import { Tasca } from 'src/app/classes/tasca/tasca';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { GestorErrorsService } from 'src/app/serveis/gestorErrors/gestor-errors.service';
import { Globals } from 'src/app/variablesGlobals';

@Component({
  selector: 'app-tasques',
  templateUrl: './tasques.component.html',
  styleUrls: ['./tasques.component.scss']
})
export class TasquesComponent implements OnInit {
  tasques$: Observable<Tasca[]>; 

  constructor(private globals: Globals, private _route: ActivatedRoute, private _router: Router, private _tasquaService: TascaService, private _snackBar: MatSnackBar, private _gestorErrors: GestorErrorsService) {
    _gestorErrors.getErrorTasques().subscribe(missatge => this.openSnackBar(missatge))
    const isParametre = _route.snapshot.paramMap.get("data")
    let parametre;
    if(isParametre) parametre = isParametre;
    
  }

  ngOnInit() {
    this._tasquaService.getTasques().subscribe()
    this.tasques$ = this._tasquaService.tasques$;
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
}
