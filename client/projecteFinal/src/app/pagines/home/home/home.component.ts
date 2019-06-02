import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from 'src/app/serveis/auth/auth.service';
import { Globals } from 'src/app/variablesGlobals';
import { HttpClient } from '@angular/common/http';
import { Usuari } from 'src/app/classes/usuari/usuari';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  correuUsuari;

  @ViewChild('sidenav') sidenav;
  mobileQuery;
  private _mobileQueryListener: () => void;
  
  constructor(private media: MediaMatcher, private changeDetectorRef: ChangeDetectorRef, private authService: AuthService, public globals: Globals, private http: HttpClient) {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.mobileQuery.addListener(this._mobileQueryListener);
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.http.get<Usuari>(`${this.globals.rutaApi}/auth/dadesUsuari`).subscribe(res => this.correuUsuari = res.email, err => {console.log("error "+err);})

    
  }
  
  ngOnInit() { 
    if(!this.mobileQuery.matches){ this.sidenav.open(); }
  }

  tancarSessio() {
    this.authService.logout();
  }
}
