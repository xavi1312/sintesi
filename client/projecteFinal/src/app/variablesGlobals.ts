import { Injectable, ApplicationRef } from "@angular/core";
import { MediaMatcher } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';

@Injectable()
export class Globals {
    rutaApi: string = 'http://localhost:3000/api';
    mobileSize: '600px';
}