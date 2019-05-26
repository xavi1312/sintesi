import { Injectable } from '@angular/core';
import { Globals } from 'src/app/variablesGlobals';
import { Tasca } from 'src/app/classes/tasca/tasca';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TascaService {

  private url: string = `${this.globals.rutaApi}/tasques`;
  private _tasques: BehaviorSubject<Tasca[]>;
  private dataStore: { tasques: Tasca[] };

  constructor(private globals: Globals, private http: HttpClient) { 
    this.dataStore = { tasques: [] };
    this._tasques = <BehaviorSubject<Tasca[]>>new BehaviorSubject([]);
  }

  /** GET */
  getTasquesObserbable() {
    this._tasques.asObservable().subscribe(res => console.log(res));
    return this._tasques.asObservable();
  }

  getTasques() {
    this.http.get<Tasca[]>(this.url).subscribe( data => {
      this.dataStore.tasques = data;
      this._tasques.next(Object.assign({}, this.dataStore).tasques);
    },
    err => {
      alert(err)
    })
  }
  getTasca(id: Number | String): Observable<Tasca> {
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

  /**  */
  private actualitzarArrayTassques() {
    
  }
}
