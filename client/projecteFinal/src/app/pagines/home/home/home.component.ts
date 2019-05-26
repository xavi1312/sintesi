import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from 'src/app/serveis/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'projecteFinal';
  @ViewChild('sidenav') sidenav;
  mobileQuery;
  private _mobileQueryListener: () => void;
  
  constructor(private media: MediaMatcher, private changeDetectorRef: ChangeDetectorRef, private authService: AuthService) {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.mobileQuery.addListener(this._mobileQueryListener);
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
  }
  
  ngOnInit() { 
    if(!this.mobileQuery.matches){ this.sidenav.open(); }
  }

  tancarSessio() {
    this.authService.logout();
  }
}
