import { Component, OnInit, ChangeDetectorRef, ViewChild, Inject, Output } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { EtiquetaService } from 'src/app/serveis/etiqueta/etiqueta.service';
import { Etiqueta } from 'src/app/classes/etiqueta/etiqueta';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Observable, of } from 'rxjs';
import { EventEmitter } from 'events';
import { Globals, MediaQuerys } from 'src/app/variablesGlobals';

@Component({
  selector: 'app-etiquetes',
  templateUrl: './etiquetes.component.html',
  styleUrls: ['./etiquetes.component.scss']
})
export class EtiquetesComponent implements OnInit {
  mobileQuery;
  
  constructor(private globals: Globals, private mediaQuerys: MediaQuerys , private etiquetaService: EtiquetaService, public dialog: MatDialog) {
    this.mediaQuerys.runMedia(this.globals.mobileSize).subscribe( res => this.mobileQuery = res )
  }
  
  ngOnInit() { 
    this.getEtiquetes();
  }

  novaEtiqueta(etiqueta: Etiqueta) {
    this.etiquetaService.novaEtiqueta(etiqueta).subscribe(
      res => {
        this.etiquetes.push(res);
      },
      err => {
        console.log(err)
      }
    )
  }
  esborarEtiqueta(id: Number) {
    this.etiquetaService.esborrarEtiqueta(id).subscribe(
      res => {
        this.etiquetes = res;
      },
      err => {
        console.log(err)
      }
    )
  }
  actualitzarEtiqueta(etiqueta: Etiqueta) {
    this.etiquetaService.actualitzarEtiqueta(etiqueta._id, etiqueta).subscribe(
      res => {
        this.etiquetes = res;
      },
      err => {
        alert(err);
      }
    )
  }
  getEtiquetes() {
    this.etiquetaService.getEtiquetes().subscribe(
      res => {
        this.etiquetes = res;
      }
    )
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