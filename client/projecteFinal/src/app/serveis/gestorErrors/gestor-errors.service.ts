import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestorErrorsService {
  private errorTasques: BehaviorSubject<string> = new BehaviorSubject('');
  private errorEtiqutes: BehaviorSubject<string> = new BehaviorSubject('');
  private errorUsuaris: BehaviorSubject<string> = new BehaviorSubject('');
  
  private missatgeTasques: BehaviorSubject<string> = new BehaviorSubject('');
  private missatgeEtiqutes: BehaviorSubject<string> = new BehaviorSubject('');
  private missatgeUsuaris: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() { }

  /** Tasques */
  nouErrorTasques(nouError: any): void { this.errorTasques.next(nouError.message); this.errorTasques.next(''); }
  getErrorTasques(): Observable<string> { return this.errorTasques.asObservable() }
  nouMissatgeTasques(nouMissatge: string): void { this.missatgeTasques.next(nouMissatge); this.missatgeTasques.next(''); }
  getMissatgeTasques(): Observable<string> { return this.missatgeTasques.asObservable() }
  
  /** Etiquetes */
  nouErrorEtiquetes(nouError: any): void { this.errorEtiqutes.next(nouError.message); this.errorEtiqutes.next(''); }
  getErrorEtiquetes(): Observable<string> { return this.errorEtiqutes.asObservable() }
  nouMissatgeEtiquetes(nouMissatge: any): void { this.missatgeEtiqutes.next(nouMissatge); this.missatgeEtiqutes.next(''); }
  getMissatgeEtiquetes(): Observable<string> { return this.missatgeEtiqutes.asObservable() }
  
  /** Usuaris */
  nouErrorUsuaris(nouError: any): void { this.errorUsuaris.next(nouError.message); this.errorUsuaris.next(''); }
  getErrorUsuaris(): Observable<string> { return this.errorUsuaris.asObservable() }
  nouMissatgeUsuaris(nouMissatge: any): void { this.missatgeUsuaris.next(nouMissatge); this.missatgeUsuaris.next(''); }
  getMissatgeUsuaris(): Observable<string> { return this.missatgeUsuaris.asObservable() }
}
