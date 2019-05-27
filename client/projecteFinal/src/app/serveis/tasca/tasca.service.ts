import { Injectable } from '@angular/core';
import { Globals } from 'src/app/variablesGlobals';
import { Tasca } from 'src/app/classes/tasca/tasca';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { GestorErrorsService } from '../gestorErrors/gestor-errors.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TascaService {

  private url: string = `${this._globals.rutaApi}/tasques/`;
  private _tasques: BehaviorSubject<Tasca[]>;
  private dataStore: { tasques: Tasca[] };

  constructor(private _globals: Globals, private _http: HttpClient, private _gestorErrorsService: GestorErrorsService, private _router: Router) { 
    this.dataStore = { tasques: [] };
    this._tasques = <BehaviorSubject<Tasca[]>>new BehaviorSubject([]);
  }

  /** GET */
  getTasquesObserbable() {
    return this._tasques.asObservable();
  }

  getTasques() {
    this._http.get<Tasca[]>(this.url).subscribe( data => {
      this.dataStore.tasques = data;
      this._tasques.next(Object.assign({}, this.dataStore).tasques);
    },
    err => {
      this._gestorErrorsService.nouError(err);
    })
  }
  getTasca(id: Number | String): Observable<Tasca> {
    return this._http.get<Tasca>(this.url+ id);
  }
  getTascaAbansData(data: Date): Observable<Tasca[]> {
    return this._http.get<Tasca[]>(this.url+ 'filtre/'+ data);
  }

  /** POST */
  novaTasca(tasca: Tasca) {
    this._http.post<Tasca>(this.url, tasca).subscribe(
      res => {
        this.dataStore.tasques.unshift(res)
      },
      err => {
        this._gestorErrorsService.nouError(err);
      }
    )
  }

  /** PUT */
  actualitzarTasca(id: Number | String, tasca:Tasca) {
    this._http.put<Tasca>(this.url+ id, tasca).subscribe(
      res => {
        this.esborrarObjecteArray(res);
        this.dataStore.tasques.unshift(res);
      },
      err => this._gestorErrorsService.nouError(err)
    )
  }

  /** DELETE */
  esborrarTasca(id: Number | String) {
    this._http.delete(this.url+ id).subscribe(
      res => { 
        this.esborrarObjecteArray(res)

      },
      err => {
        this._gestorErrorsService.nouError(err)
      }
    )
  }

  /** Funcions utils */
  private esborrarObjecteArray(objecte) {
    // Trobar objecte
    const indexEliminar = this.dataStore.tasques.map((item) => { return item._id; }).indexOf(objecte._id);
    
    // Esborrar objecte
    this.dataStore.tasques.splice(indexEliminar, 1);
  }
}
