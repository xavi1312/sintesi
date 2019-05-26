import { Component, OnInit, Input } from '@angular/core';
import { Tasca } from 'src/app/classes/tasca/tasca';

@Component({
  selector: 'app-tasca',
  templateUrl: './tasca.component.html',
  styleUrls: ['./tasca.component.scss']
})
export class TascaComponent implements OnInit {
  @Input('tasca') tasca: Tasca = {
    nom: 'Tasca 1',
    contingut: '',
    acabat: false,
    alarma: new Date(),
    etiquetes: [{nom: 'Mates'}, {nom: 'Cole'}, {nom: 'Arrels cuadrades'}]
  };
  constructor() { }

  ngOnInit() {
  }

}
