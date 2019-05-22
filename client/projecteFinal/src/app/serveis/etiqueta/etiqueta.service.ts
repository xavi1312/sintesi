import { Injectable } from '@angular/core';
import { Globals } from 'src/app/variablesGlobals';
import { HttpClient } from '@angular/common/http';
import { Etiqueta } from 'src/app/classes/etiqueta/etiqueta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtiquetaService {

  private url: string = `${this.globals.rutaApi}/etiquetes/`;
  constructor(private globals: Globals, private http: HttpClient) { }

  /** GET */
  getEtiquetes(): Observable<Etiqueta[]> {
    return this.http.get<Etiqueta[]>(this.url);
  }
  getEtiqueta(id: Number): Observable<Etiqueta> {
    return this.http.get<Etiqueta>(this.url+ id);
  }
  
  /** POST */
  novaEtiqueta(etiqueta: Etiqueta): Observable<any> {
    return this.http.post(this.url, etiqueta);
  }

  /** PUT */
  actualitzarEtiqueta(id: Number, etiqueta: Etiqueta): Observable<any> {
    return this.http.put(this.url + id, etiqueta);
  }

  /** DELETE */
  esborrarEtiqueta(id: Number): Observable<any> {
    return this.http.delete(this.url+ id);
  }
}
