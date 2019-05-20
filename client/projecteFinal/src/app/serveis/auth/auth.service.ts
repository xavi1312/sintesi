import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Usuari } from '../../classes/usuari/usuari';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:3000/api/auth/';

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
