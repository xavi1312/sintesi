import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TascaService } from 'src/app/serveis/tasca/tasca.service';
import { Observable } from 'rxjs';
import { Tasca } from 'src/app/classes/tasca/tasca';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasques',
  templateUrl: './tasques.component.html',
  styleUrls: ['./tasques.component.scss']
})
export class TasquesComponent implements OnInit {
  tasques$: Tasca[]; 

  constructor(private _route: ActivatedRoute, private _router: Router, private _tasquaService: TascaService) {
    const isParametre = _route.snapshot.paramMap.get("data")
    let parametre;
    if(isParametre) parametre = isParametre;
    
  }

  ngOnInit() {
    this._tasquaService.getTasques();
    this._tasquaService.getTasquesObserbable().subscribe(
      res =>{ this.tasques$ = res; alert(res)}
    )
  }

  novaTasca() {
    this._router.navigateByUrl('tasca');
  }
}
