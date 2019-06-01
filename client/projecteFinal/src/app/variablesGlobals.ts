import { Injectable, ApplicationRef } from "@angular/core";
import { MediaMatcher } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';

@Injectable()
export class Globals {
    rutaApi: string = 'http://speedquiz.cat/gtasks/servidor:17783/api';
    mobileSize: '600px';
    tempsNotificacions: 2000;
}