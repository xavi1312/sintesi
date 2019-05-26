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
  fruitCtrl = new FormControl();
  etiquetesFiltrades: Observable<Etiqueta[]>;
  fruits: Etiqueta[] = [];
  totesEtiquetes: Etiqueta[] = [{_id: 1, nom: 'etiqueta1'}, {_id: 2, nom: 'etiqueta2'}, {_id: 3, nom: 'etiqueta3'}, {_id: 4, nom: 'etiqueta4'}];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor() {
    this.etiquetesFiltrades = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: Etiqueta | null) => fruit ? this._filter(fruit) : this.totesEtiquetes.slice())
    );
  }
  ngOnInit() { }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '')) {
        this.fruits.push(value);
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.fruitCtrl.setValue(null);
    }
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: Etiqueta): Etiqueta[] {
    return this.totesEtiquetes.filter(fruit => fruit._id === value._id);
  }
}
