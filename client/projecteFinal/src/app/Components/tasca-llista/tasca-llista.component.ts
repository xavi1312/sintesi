import { Component, OnInit, Input } from '@angular/core';
import { Tasca } from 'src/app/classes/tasca/tasca';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasca-llista',
  templateUrl: './tasca-llista.component.html',
  styleUrls: ['./tasca-llista.component.scss']
})
export class TascaLlistaComponent implements OnInit {
  @Input('tasca') tasca: Tasca;
  constructor(private _router: Router) { }

  ngOnInit() {
  }

  editarTasca() {
    this._router.navigate(['/tasca/', this.tasca._id])
  }
  tascaFeta() {

  }
}
