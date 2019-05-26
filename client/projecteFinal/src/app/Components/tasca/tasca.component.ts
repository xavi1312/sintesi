import { Component, OnInit } from '@angular/core';
import { Tasca } from 'src/app/classes/tasca/tasca';
import { ActivatedRoute, Router } from '@angular/router';
import { TascaService } from 'src/app/serveis/tasca/tasca.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-tasca',
  templateUrl: './tasca.component.html',
  styleUrls: ['./tasca.component.scss']
})
export class TascaComponent implements OnInit {

  tasca: Tasca;
  guardar: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  constructor(private _route: ActivatedRoute, private _router: Router, private _tasquaService: TascaService) {
    (_route.snapshot.params['id']) ? this.getTasca(_route.snapshot.params['id']) : this.tasca = new Tasca; this.tasca.nom = "Nova tasca"
    
  }
  ngOnInit() {

  }

  getTasca(id: String | Number) {
    this._tasquaService.getTasca(id).subscribe(res => this.tasca = res)
  }
}
