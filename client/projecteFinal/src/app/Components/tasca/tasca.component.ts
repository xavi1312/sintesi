import { Component, OnInit } from '@angular/core';
import { Tasca } from 'src/app/classes/tasca/tasca';
import { ActivatedRoute, Router } from '@angular/router';
import { TascaService } from 'src/app/serveis/tasca/tasca.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-tasca',
  templateUrl: './tasca.component.html',
  styleUrls: ['./tasca.component.scss']
})
export class TascaComponent implements OnInit {

  tasca: Tasca;
  isNova: Boolean = true;

  guardar: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  constructor(private _route: ActivatedRoute, private _router: Router, private _tasquaService: TascaService) {
    (_route.snapshot.params['id']) ? this.getTasca(_route.snapshot.params['id']) : this.tasca = new Tasca();
  }
  ngOnInit() {

  }

  getTasca(id: String | Number) {
    this.isNova = false;
    this._tasquaService.getTasca(id).subscribe(res => {
      this.tasca = new Tasca(); this.tasca= Object.assign(this.tasca, res);
    }, err=> console.log(err))
  }

  guardarTasca() {
    if(this.isNova) {
      this._tasquaService.novaTasca(this.tasca)
    }
    else {
      this._tasquaService.actualitzarTasca(this.tasca._id, this.tasca)
    }
  }
  canviEtiquetes(etiquetes) {
    this.tasca.etiquetes = etiquetes;
  }
}
