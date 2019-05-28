import { Component, OnInit } from '@angular/core';
import { Tasca } from 'src/app/classes/tasca/tasca';
import { ActivatedRoute, Router } from '@angular/router';
import { TascaService } from 'src/app/serveis/tasca/tasca.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { GestorErrorsService } from 'src/app/serveis/gestorErrors/gestor-errors.service';
import { MatSnackBar } from '@angular/material';
import { Globals } from 'src/app/variablesGlobals';

@Component({
  selector: 'app-tasca',
  templateUrl: './tasca.component.html',
  styleUrls: ['./tasca.component.scss']
})
export class TascaComponent implements OnInit {

  tasca: Tasca;
  isNova: Boolean = true;

  guardar: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  constructor(private globals: Globals, private _route: ActivatedRoute, private _router: Router, private _tasquaService: TascaService, private _snackBar: MatSnackBar, private _gestorErrors: GestorErrorsService) {
    (_route.snapshot.params['id']) ? this.getTasca(_route.snapshot.params['id']) : this.tasca = new Tasca();
    _gestorErrors.getMissatgeTasques().subscribe(missatge => this.openSnackBar(missatge))
    _gestorErrors.getErrorTasques().subscribe(missatge => this.openSnackBar(missatge))
  }
  ngOnInit() { }

  getTasca(id: String | Number) {
    this.isNova = false;
    this._tasquaService.getTasca(id).subscribe(res => {
      this.tasca = new Tasca(); this.tasca= Object.assign(this.tasca, res);
    })
  }

  guardarTasca() {
    if(this.isNova) {
      this._tasquaService.novaTasca(this.tasca).subscribe()
    }
    else {
      this.actualitzarTasca()
    }
  }
  esborrarTasca() {
    this._tasquaService.esborrarTasca(this.tasca._id).subscribe(res => this._router.navigateByUrl(''))
  }
  actualitzarTasca() { this._tasquaService.actualitzarTasca(this.tasca._id, this.tasca).subscribe() }
  // Quan es canvia una etiqueta a l'input
  canviEtiquetes(etiquetes) {
    this.tasca.etiquetes = etiquetes;
  }

  openSnackBar(missatge: string, accio?: string) {
    if(!accio) accio = 'Dacord'
    if(missatge || missatge != '') {
      this._snackBar.open(missatge, accio, {
        duration: this.globals.tempsNotificacions,
      });
    }
  }
}
