import { Injectable } from '@angular/core';
import { Globals } from 'src/app/variablesGlobals';
import { Tasca } from 'src/app/classes/tasca/tasca';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TascaService {

  private url: string = `${this.globals.rutaApi}/tasques`;
  constructor(private globals: Globals, private http: HttpClient) { }

  /** GET */
  getTasques(): Observable<Tasca> {
    return this.http.get<Tasca>(this.url);
  }
  getTasca(id: Number): Observable<Tasca> {
    return this.http.get<Tasca>(this.url+ id);
  }
  getTascaAbansData(data: Date): Observable<Tasca[]> {
    return this.http.get<Tasca[]>(this.url+ '/filtre'+ data);
  }

  /** POST */
  novaTasca(tasca: Tasca): Observable<any> {
    return this.http.post(this.url, tasca);
  }

  /** PUT */
  actualitzarTasca(id: Number, tasca:Tasca): Observable<any> {
    return this.http.put(this.url+ id, tasca);
  }

  /** DELETE */
  esborrarTasca(id: Number): Observable<any> {
    return this.http.delete(this.url+ id);
  }
}
