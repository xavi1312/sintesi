import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestorErrorsService {
  private error: any;

  constructor() { }

  nouError(nouError: any): void {
    this.error = nouError;
    console.log("ERROR MANAGER: \n")
    console.table(this.error)
    alert()
  }
  getError(): Observable<any> {
    return of(this.error);
  }
}
