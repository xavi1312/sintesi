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
  private _mobileQueryListener: () => void;
  
  constructor(private globals: Globals, private mediaQuerys: MediaQuerys, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  
  ngOnInit() { 
    if(!this.mobileQuery.matches){ this.sidenav.open(); }
  }

}
