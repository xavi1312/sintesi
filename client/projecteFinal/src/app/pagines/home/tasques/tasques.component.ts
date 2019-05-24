import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tasques',
  templateUrl: './tasques.component.html',
  styleUrls: ['./tasques.component.scss']
})
export class TasquesComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    const isParametre = route.snapshot.paramMap.get("data")
    let parametre;
    if(isParametre) parametre = isParametre;
    
  }

  ngOnInit() {

  }

  novaTasca() {
    
  }
}
