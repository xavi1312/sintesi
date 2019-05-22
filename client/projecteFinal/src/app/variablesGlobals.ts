import { Injectable } from "@angular/core";
import { MediaMatcher } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';

@Injectable()
export class Globals {
    rutaApi: string = 'http://localhost:3000/api';
    mobileSize: '600px';
}

@Injectable()
export class MediaQuerys {
    constructor(private media: MediaMatcher) { }
    
    runMedia(mida: String): Observable<any> {
        let mobileQuery = this.media.matchMedia(`(max-width: ${mida})`);
        return of(mobileQuery);
    }

}