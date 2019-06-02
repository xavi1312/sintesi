import { Component, OnInit, Input } from '@angular/core';
import { Tasca } from 'src/app/classes/tasca/tasca';
import { Router } from '@angular/router';
import { TascaService } from 'src/app/serveis/tasca/tasca.service';
import * as moment from 'moment';

@Component({
  selector: 'app-tasca-llista',
  templateUrl: './tasca-llista.component.html',
  styleUrls: ['./tasca-llista.component.scss']
})
export class TascaLlistaComponent implements OnInit {
  @Input('tasca') tasca: Tasca;
  data = '';
  temps = '';
  constructor(private _router: Router, private _tascaService: TascaService) { }

  ngOnInit() { 
    if(this.tasca.alarma) {
      const data = moment(this.tasca.alarma).format('YYYY-MM-DD');
      this.data = moment(data, "YYYYMMDD").fromNow();
    }
  }

  editarTasca() {
    this._router.navigate(['/tasca/', this.tasca._id])
  }
  tascaFeta() {
    this.tasca.acabada = true;
    this._tascaService.actualitzarTasca(this.tasca._id, this.tasca).subscribe()
  }
}
