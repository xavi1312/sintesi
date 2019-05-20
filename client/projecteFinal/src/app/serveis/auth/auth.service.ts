import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Globals } from 'src/app/variablesGlobals';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private globals: Globals) { }

  private url = `${this.globals.rutaApi}/auth`;

  public registre(dadesForm): Observable<any> {
    return this.http.post(this.url+"register", dadesForm);
  }
  public iniciSessio(dadesForm): Observable<any> {
    return this.http.post(this.url+"login", dadesForm);
  }
  public logout() {
    localStorage.removeItem('usuariActual');
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
    let isAuth = false;
    
    if(this.getToken() || this.getToken() != null) isAuth = true;

    return isAuth;
  }
}
