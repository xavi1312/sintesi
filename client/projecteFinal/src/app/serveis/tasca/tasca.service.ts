import { Injectable } from '@angular/core';
import { Globals } from 'src/app/variablesGlobals';
import { Tasca } from 'src/app/classes/tasca/tasca';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { GestorErrorsService } from '../gestorErrors/gestor-errors.service';
import { Router } from '@angular/router';
import { map, share, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TascaService {

  private url: string = `${this._globals.rutaApi}/tasques/`;
  private dataStore: { tasques: Tasca[] };
  private _tasques: BehaviorSubject<Tasca[]>;
  public tasques$: Observable<Tasca[]>;

  constructor(private _globals: Globals, private _http: HttpClient, private _gestorErrorsService: GestorErrorsService, private _router: Router) { 
    this.dataStore = { tasques: [] };
    this._tasques = <BehaviorSubject<Tasca[]>>new BehaviorSubject([]);
    this.tasques$ = this._tasques.asObservable();
  }

  /** GET */
  getTasques(): Observable<Tasca[]> {
    return this._http.get<Tasca[]>(this.url).pipe(
      catchError(err => { 
        this._gestorErrorsService.nouErrorTasques(err)
        return throwError(err)
      }),
      map(tasques => {
        this.dataStore.tasques = tasques;
        this.actualitzarStore()
        return tasques
      })
    )
  }
  getTasca(id: Number | String): Observable<Tasca> {
    return this._http.get<Tasca>(this.url+ id).pipe(
      catchError(err => {
        this._gestorErrorsService.nouErrorTasques(err)
        return throwError(err)
      })
    )
  }
  getTascaAbansData(data: Date): Observable<Tasca[]> {
    return this._http.get<Tasca[]>(this.url+ 'filtre/'+ data).pipe(
      catchError(err => {
        this._gestorErrorsService.nouErrorTasques(err)
        return throwError(err);
      })
    )
  }

  /** POST */
  novaTasca(tasca: Tasca): Observable<Tasca> {
    return this._http.post<Tasca>(this.url, tasca).pipe(
      catchError(err => { 
        this._gestorErrorsService.nouErrorTasques(err); 
        return throwError(err)
      }),
      map(novaTasca => {
        this.dataStore.tasques.unshift(novaTasca)
        this.actualitzarStore()
        this._gestorErrorsService.nouMissatgeTasques("S'ha guardat la tasca")
        return novaTasca
      })
    )
  }

  /** PUT */
  actualitzarTasca(id: Number | String, tasca:Tasca): Observable<Tasca> {
    return this._http.put<Tasca>(this.url+ id, tasca).pipe(
      catchError(err => { 
        this._gestorErrorsService.nouErrorTasques(err)
        return throwError(err)
      }),
      map(tascaActualitzada => {
        this.esborrarObjecteArray(tascaActualitzada);
        if(!tascaActualitzada.acabada || !tascaActualitzada.acabada == undefined) { this.dataStore.tasques.unshift(tascaActualitzada); }
        this.actualitzarStore()
        this._gestorErrorsService.nouMissatgeTasques("S'ha guardat la tasca")
        return tascaActualitzada
      })
    )
  }

  /** DELETE */
  esborrarTasca(id: Number | String): Observable<Tasca> {
    return this._http.delete<Tasca>(this.url+ id).pipe(
      catchError(err => { 
        this._gestorErrorsService.nouErrorTasques(err)
        return throwError(err)
      }),
      map(tascaEsborrada => {
        this.esborrarObjecteArray(tascaEsborrada)
        this.actualitzarStore()
        this._gestorErrorsService.nouMissatgeTasques("S'ha esborrat la tasca")
        return tascaEsborrada
      })
    )
  }

  /** Funcions utils */
  private esborrarObjecteArray(objecte) {
    // Trobar objecte
    const indexEliminar = this.dataStore.tasques.map((item) => { return item._id; }).indexOf(objecte._id);
    
    // Esborrar objecte
    this.dataStore.tasques.splice(indexEliminar, 1);
  }
  private actualitzarStore() {
    this._tasques.next(Object.assign({}, this.dataStore).tasques);
  }
}
