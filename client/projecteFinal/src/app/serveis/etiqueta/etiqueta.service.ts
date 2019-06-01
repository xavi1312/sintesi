import { Injectable } from '@angular/core';
import { Globals } from 'src/app/variablesGlobals';
import { HttpClient } from '@angular/common/http';
import { Etiqueta } from 'src/app/classes/etiqueta/etiqueta';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GestorErrorsService } from '../gestorErrors/gestor-errors.service';

@Injectable({
  providedIn: 'root'
})
export class EtiquetaService {
  private url: string = `${this._globals.rutaApi}/etiquetes/`;
  private dataStore: { etiquetes: Etiqueta[] };
  private _etiquetes: BehaviorSubject<Etiqueta[]>;
  public etiquetes$;

  constructor(private _globals: Globals, private _http: HttpClient, private _gestorErrorsService: GestorErrorsService) {
    this.dataStore = { etiquetes: [] };
    this._etiquetes = <BehaviorSubject<Etiqueta[]>>new BehaviorSubject([]);
    this.etiquetes$ = this._etiquetes.asObservable();
   }

  /** GET */
  getEtiquetes(): Observable<Etiqueta[]> {
    return this._http.get<Etiqueta[]>(this.url).pipe(
      catchError(err => { 
        this._gestorErrorsService.nouErrorEtiquetes(err)
        return throwError(err)
      }),
      map(etiquetes => {
        this.dataStore.etiquetes = etiquetes;
        this.actualitzarStore()
        return etiquetes
      })
    )
  }
  getEtiqueta(id: Number): Observable<Etiqueta> {
    return this._http.get<Etiqueta>(this.url+ id).pipe(
      catchError(err => {
        this._gestorErrorsService.nouErrorEtiquetes(err)
        return throwError(err)
      })
    )
  }
  
  /** POST */
  novaEtiqueta(etiqueta: Etiqueta): Observable<Etiqueta> {
    return this._http.post<Etiqueta>(this.url, etiqueta).pipe(
      catchError(err => { 
        this._gestorErrorsService.nouErrorEtiquetes(err)
        return throwError(err)
      }),
      map(novaEtiqueta => {
        this.dataStore.etiquetes.unshift(novaEtiqueta)
        this.actualitzarStore()
        this._gestorErrorsService.nouMissatgeTasques("S'ha guardat l'etiqueta")
        return novaEtiqueta
      })
    )
  }

  /** PUT */
  actualitzarEtiqueta(id: Number, etiqueta: Etiqueta): Observable<any> {
    return this._http.put<Etiqueta>(this.url + id, etiqueta).pipe(
      catchError(err => { 
        this._gestorErrorsService.nouErrorEtiquetes(err)
        return throwError(err)
      }),
      map(etiquetaActualitzada => {
        this.esborrarObjecteArray(etiquetaActualitzada);
        this.dataStore.etiquetes.unshift(etiquetaActualitzada); 
        this.actualitzarStore()
        this._gestorErrorsService.nouMissatgeTasques("S'ha guardat l'etiqueta")
        return etiquetaActualitzada
      })
    )
    }

  /** DELETE */
  esborrarEtiqueta(id: Number): Observable<any> {
    return this._http.delete(this.url+ id).pipe(
      catchError(err => { 
        this._gestorErrorsService.nouErrorEtiquetes(err)
        return throwError(err)
      }),
      map(etiquetaEsborrada => {
        this.esborrarObjecteArray(etiquetaEsborrada)
        this.actualitzarStore()
        this._gestorErrorsService.nouMissatgeTasques("S'ha esborrat l'etiqueta")
        return etiquetaEsborrada
      })
    )
  }
  
  /** Funcions utils */
  private esborrarObjecteArray(objecte) {
    // Trobar objecte
    const indexEliminar = this.dataStore.etiquetes.map((item) => { return item._id; }).indexOf(objecte._id);
    
    // Esborrar objecte
    this.dataStore.etiquetes.splice(indexEliminar, 1);
  }
  private actualitzarStore() {
    let a = Object.assign({}, this.dataStore)
    this._etiquetes.next(a.etiquetes);
  }
}
