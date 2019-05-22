import { Component, ChangeDetectorRef, ViewChild, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MediaQuerys, Globals } from './variablesGlobals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'projecteFinal';
  @ViewChild('sidenav') sidenav;
  mobileQuery;
  
  constructor(private globals: Globals, private mediaQuerys: MediaQuerys) {
    this.mediaQuerys.runMedia(this.globals.mobileSize).subscribe( res => this.mobileQuery = res )
  }
  
  ngOnInit() { 
    if(!this.mobileQuery.matches){ this.sidenav.open(); }
  }

}
