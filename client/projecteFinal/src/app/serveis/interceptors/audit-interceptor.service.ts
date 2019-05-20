import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuditInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }
  
  public intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    })
    return next.handle(req);
  }
}
