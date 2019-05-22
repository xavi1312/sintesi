import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Etiqueta } from 'src/app/classes/etiqueta/etiqueta';

@Component({
  selector: 'app-etiqueta',
  templateUrl: './etiqueta.component.html',
  styleUrls: ['./etiqueta.component.scss']
})
export class EtiquetaComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  @Input('etiquta') etiqueta: Etiqueta;
  @Output() public editar = new EventEmitter<Etiqueta>();
  @Output() public eliminar = new EventEmitter<Number>();

  editarEtiqueta(novaEtiqueta: Etiqueta): void { this.editar.emit(novaEtiqueta); }
  eliminarEtiqueta(): void { this.eliminar.emit(this.etiqueta._id) }

  obrirDialog(): void {
    const dialogRef = this.dialog.open(DialogEditarEtiqueta, {
      width: '250px',
      data: {nom: this.etiqueta.nom}
    });

    dialogRef.afterClosed().subscribe(res => {
      if(this.etiqueta.nom != res && res != ' ' && res != undefined){
        let novaEtiqueta: Etiqueta = {
          _id: this.etiqueta._id,
          nom: res
        }
        this.editarEtiqueta(novaEtiqueta);
      }
    });
  }
}

@Component({
  selector: 'dialog-editar-etiqueta',
  templateUrl: 'dialog-editar-etiqueta.html',
})
export class DialogEditarEtiqueta {

  constructor(
    public dialogRef: MatDialogRef<DialogEditarEtiqueta>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}