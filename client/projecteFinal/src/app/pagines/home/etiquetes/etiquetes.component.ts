import { Component, OnInit, Inject } from '@angular/core';
import { EtiquetaService } from 'src/app/serveis/etiqueta/etiqueta.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Globals } from 'src/app/variablesGlobals';
import { Etiqueta } from 'src/app/classes/etiqueta/etiqueta';

@Component({
  selector: 'app-etiquetes',
  templateUrl: './etiquetes.component.html',
  styleUrls: ['./etiquetes.component.scss']
})
export class EtiquetesComponent implements OnInit {
  mobileQuery;
  etiquetes: Etiqueta[];
  etiquetaNova: Etiqueta;
  
  constructor(private etiquetaService: EtiquetaService, public dialog: MatDialog) { }
  
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
        
      }
    )
  }
  getEtiquetes() {
    this.etiquetaService.getEtiquetes().subscribe(
      res => {
        this.etiquetes = res;
      },
      err => {
        
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