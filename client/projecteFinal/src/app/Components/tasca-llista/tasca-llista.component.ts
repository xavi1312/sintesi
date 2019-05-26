import { Component, OnInit, Input } from '@angular/core';
import { Tasca } from 'src/app/classes/tasca/tasca';

@Component({
  selector: 'app-tasca-llista',
  templateUrl: './tasca-llista.component.html',
  styleUrls: ['./tasca-llista.component.scss']
})
export class TascaLlistaComponent implements OnInit {
  @Input('tasca') tasca: Tasca;
  constructor() { }

  ngOnInit() {
  }

}
