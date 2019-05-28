import { Component, OnInit, Inject } from '@angular/core';
import { EtiquetaService } from 'src/app/serveis/etiqueta/etiqueta.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { Globals } from 'src/app/variablesGlobals';
import { Etiqueta } from 'src/app/classes/etiqueta/etiqueta';
import { Observable } from 'rxjs';
import { GestorErrorsService } from 'src/app/serveis/gestorErrors/gestor-errors.service';

@Component({
  selector: 'app-etiquetes',
  templateUrl: './etiquetes.component.html',
  styleUrls: ['./etiquetes.component.scss']
})
export class EtiquetesComponent implements OnInit {
  mobileQuery;
  etiquetes$: Observable<Etiqueta[]>;
  etiquetaNova: Etiqueta;
  
  constructor(private globals: Globals, private _etiquetaService: EtiquetaService, public dialog: MatDialog, private _snackBar: MatSnackBar, private _gestorErrors: GestorErrorsService) {
    _gestorErrors.getMissatgeTasques().subscribe(missatge => this.openSnackBar(missatge))
    _gestorErrors.getErrorTasques().subscribe(missatge => this.openSnackBar(missatge))
  }
  
  ngOnInit() { 
    this.getEtiquetes();
    this.etiquetes$ = this._etiquetaService.etiquetes$;
  }

  novaEtiqueta(etiqueta: Etiqueta) { this._etiquetaService.novaEtiqueta(etiqueta).subscribe() }
  esborarEtiqueta(id: Number) { this._etiquetaService.esborrarEtiqueta(id).subscribe() }
  actualitzarEtiqueta(etiqueta: Etiqueta) { this._etiquetaService.actualitzarEtiqueta(etiqueta._id, etiqueta).subscribe() }
  getEtiquetes() { this._etiquetaService.getEtiquetes().subscribe() }

  openSnackBar(missatge: string, accio?: string) {
    if(!accio) accio = 'Dacord'
    if(missatge || missatge != '') {
      this._snackBar.open(missatge, accio, {
        duration: this.globals.tempsNotificacions,
      });
    }
  }
  obrirDialog(): void {
    this.etiquetaNova = new Etiqueta;
    const dialogRef = this.dialog.open(DialogNovaEtiqueta, {
      width: '250px',
      data: {nom: this.etiquetaNova.nom}
    });

    dialogRef.afterClosed().subscribe(res => {
      if(this.etiquetaNova.nom != res && res != ' ' && res != undefined){
        let novaEtiqueta: Etiqueta = {
          _id: 0,
          nom: res
        }
        this.novaEtiqueta(novaEtiqueta);
      }
    });
  }
}

@Component({
  selector: 'dialog-nova-etiqueta',
  templateUrl: 'dialog-nova-etiqueta.html',
})
export class DialogNovaEtiqueta {

  constructor(
    public dialogRef: MatDialogRef<DialogNovaEtiqueta>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}