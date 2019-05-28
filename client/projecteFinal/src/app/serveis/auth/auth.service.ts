import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Globals } from 'src/app/variablesGlobals';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private globals: Globals,  private _router: Router) { }

  private url = `${this.globals.rutaApi}/auth`;

  public registre(dadesForm): Observable<any> {
    return this.http.post(this.url+"/register", dadesForm);
  }
  public iniciSessio(dadesForm): Observable<any> {
    return this.http.post(this.url+"/login", dadesForm);
  }
  public logout() {
    localStorage.removeItem('usuariActual');
    this._router.navigateByUrl('inici-sessio');
  }

  public nouToken(token) {
    localStorage.setItem('usuariActual', JSON.stringify(token))
  }
  public getToken(): String {
    try {
      return JSON.parse(localStorage.getItem('usuariActual')).token;
    }
    catch(err) {
      return null;
    }
  }
  public isAuth(): Boolean {
    return (this.getToken() || this.getToken() != null) ? true : false
  }
}
