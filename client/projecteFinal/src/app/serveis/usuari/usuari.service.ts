import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuari } from '../../classes/usuari/usuari';
import { Globals } from '../../variablesGlobals';

@Injectable({
  providedIn: 'root'
})
export class UsuariService {

  constructor(private http: HttpClient, private globals: Globals) { }

  private url = this.globals.rutaApi;

  /** GET */
  public getUsuari(): Observable<Usuari> {
    return this.http.get<Usuari>(this.url);
  }
}
