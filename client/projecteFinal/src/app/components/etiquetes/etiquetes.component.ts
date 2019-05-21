import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { EtiquetaService } from 'src/app/serveis/etiqueta/etiqueta.service';
import { Etiqueta } from 'src/app/classes/etiqueta/etiqueta';

@Component({
  selector: 'app-etiquetes',
  templateUrl: './etiquetes.component.html',
  styleUrls: ['./etiquetes.component.scss']
})
export class EtiquetesComponent implements OnInit {
  
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private etiquetaService: EtiquetaService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  
  ngOnInit() { 
    if(!this.mobileQuery.matches){ this.sidenav.open(); }
  }

  @ViewChild('sidenav') sidenav;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  private etiquetes: Etiqueta[] = [{id: 1, nom: 'Mates'}, {id: 2, nom: 'Castellà'}];

  novaEtiqueta(etiqueta: Etiqueta) {
    this.etiquetaService.novaEtiqueta(etiqueta).subscribe(
      res => {
        this.etiquetes = res;
      }
    )
  }
  esboorarEtiqueta(id: Number) {
    this.etiquetaService.esborrarEtiqueta(id).subscribe(
      res => {
        this.etiquetes = res;
      }
    )
  }
  actualitzarEtiqueta(etiqueta: Etiqueta) {
    this.etiquetaService.actualitzarEtiqueta(etiqueta).subscribe(
      res => {
        this.etiquetes = res;
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
}