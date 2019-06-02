import { Component, OnInit, Inject } from '@angular/core';
import { Tasca } from 'src/app/classes/tasca/tasca';
import { ActivatedRoute, Router } from '@angular/router';
import { TascaService } from 'src/app/serveis/tasca/tasca.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { GestorErrorsService } from 'src/app/serveis/gestorErrors/gestor-errors.service';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Globals } from 'src/app/variablesGlobals';
import * as moment from 'moment';

// Datetime picker
import { MatDatepickerIntl, MAT_DATE_FORMATS } from '@coachcare/datepicker';
const PW_DATE_FORMATS = {
  parse: {
    dateInput: 'LLL',
    datetime: 'LLL',
    date: 'L',
    time: 'LT'
  },
  display: {
    dateInput: 'LLL',
    date: 'LL',
    datetime: 'LLL',
    time: 'LT',
    dateA11yLabel: 'L',
    monthDayLabel: 'D MMM',
    monthDayA11yLabel: 'D MMMM',
    monthYearLabel: 'MMMM YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
    timeLabel: 'LT'
  }
};

@Component({
  selector: 'app-tasca',
  templateUrl: './tasca.component.html',
  styleUrls: ['./tasca.component.scss'],
  providers : [
    { provide: MatDatepickerIntl },
    { provide: MAT_DATE_FORMATS, useValue: PW_DATE_FORMATS }
  ]
})
export class TascaComponent implements OnInit {

  tasca: Tasca;
  isNovaTasca: Boolean = true;
  tempsAvis: number;
  modulCarregat: Boolean = false;

  guardar: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  constructor(private globals: Globals, private _route: ActivatedRoute, private _router: Router, private _tasquaService: TascaService, private _snackBar: MatSnackBar, private _gestorErrors: GestorErrorsService, public dialog: MatDialog) {
    (_route.snapshot.params['id']) ? this.getTasca(_route.snapshot.params['id']) : this.tasca = new Tasca();
    _gestorErrors.getMissatgeTasques().subscribe(missatge => this.openSnackBar(missatge))
    _gestorErrors.getErrorTasques().subscribe(missatge => this.openSnackBar(missatge))
    this.tempsAvis = this.globals.tempsNotificacions;
    // Temps que darda en carregar l'editor
    setTimeout(() => { this.modulCarregat = true; }, 3500)
  }
  ngOnInit() { }

  getTasca(id: String | Number) {
    this.isNovaTasca = false;
    this._tasquaService.getTasca(id).subscribe(res => {
      this.tasca = new Tasca(); this.tasca= Object.assign(this.tasca, res);
    })
  }

  guardarTasca() {
    (this.isNovaTasca) ? this._tasquaService.novaTasca(this.tasca).subscribe() : this.actualitzarTasca()
  }
  esborrarTasca() { this._tasquaService.esborrarTasca(this.tasca._id).subscribe(res => this._router.navigateByUrl('')) }
  actualitzarTasca() { this._tasquaService.actualitzarTasca(this.tasca._id, this.tasca).subscribe() }
  
  // Quan es canvia una etiqueta a l'input
  canviEtiquetes(etiquetes) { this.tasca.etiquetes = etiquetes; }

  openSnackBar(missatge: string, accio?: string) {
    if(!accio) accio = 'Dacord'
    if(missatge && missatge != '') {
      console.log(missatge)
      this._snackBar.open(missatge, accio, {
        duration: this.tempsAvis,
      });
    }
  }

  obrirDialogAlarma(): void {
    const dialogRef = this.dialog.open(DialogAlarma, {
      width: '250px',
      data: this.tasca
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.tasca.alarma = moment(result).toDate()
      }
    });
  }
}
@Component({
  selector: 'DialogAlarma',
  templateUrl: 'dialogAlarma.html'
})
export class DialogAlarma {

  constructor(
    public dialogRef: MatDialogRef<DialogAlarma>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}