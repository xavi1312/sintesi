import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuari } from '../../classes/usuari/usuari';

@Injectable({
  providedIn: 'root'
})
export class UsuariService {

  constructor(private http: HttpClient) { }

  private url = '';

  public getUsuari(): Observable<Usuari> {
    return this.http.get<Usuari>(this.url);
  }
}
