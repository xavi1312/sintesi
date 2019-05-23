import { Component, OnInit } from '@angular/core';
import { Globals, MediaQuerys } from 'src/app/variablesGlobals';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  mobileQuery;

  constructor(private globals: Globals, private mediaQuerys: MediaQuerys) { 
    this.mobileQuery = mediaQuerys.runMedia(globals.mobileSize);
  }

  ngOnInit() {
  }

}
