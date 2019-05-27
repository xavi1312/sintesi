import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Tasca } from 'src/app/classes/tasca/tasca';
import { MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs/operators';
import { TascaService } from 'src/app/serveis/tasca/tasca.service';
import { Etiqueta } from 'src/app/classes/etiqueta/etiqueta';
import { EtiquetaService } from 'src/app/serveis/etiqueta/etiqueta.service';

@Component({
  selector: 'app-select-autocompletat',
  templateUrl: './select-autocompletat.component.html',
  styleUrls: ['./select-autocompletat.component.scss']
})
export class SelectAutocompletatComponent implements OnInit {
  visible = true; selectable = true; removable = true; addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  etiquetaCtrl = new FormControl();
  etiquetesFiltrades: Observable<string[]>;
  totesEtiquetes: any = [];
  @Input('etiquetes') etiquetes: any[];
  @Output() canviEtiquetes = new EventEmitter();

  @ViewChild('fruitInput') fruitInput: ElementRef;

  constructor(private _etiquetaService: EtiquetaService) {
    _etiquetaService.getEtiquetes().subscribe(res => {this.totesEtiquetes = res})

    this.etiquetesFiltrades = this.etiquetaCtrl.valueChanges.pipe(
      startWith(null),
      map((etiqueta: string | null) => etiqueta ? this._filter(etiqueta) : this.totesEtiquetes.slice()));
  }
  ngOnInit() { }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Afegir etiqueta
    if ((value || '').trim()) {
      /*this.etiquetes.push({
          id: Math.random(),
          name: value.trim()
      });*/
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.etiquetaCtrl.setValue(null);
  }

  remove(etiqueta, indx): void {
    this.etiquetes.splice(indx, 1);
    this.canviValorInput()
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.etiquetes.push(event.option.value)
    this.fruitInput.nativeElement.value = '';
    this.etiquetaCtrl.setValue(null);
    this.canviValorInput()
  }

  private _filter(value: any): string[] {
    return this.totesEtiquetes.filter(fruit => fruit._id === value._id);
  }
  private canviValorInput() {
    this.canviEtiquetes.emit(this.etiquetes)
  }
}
