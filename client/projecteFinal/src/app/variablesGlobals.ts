import { Injectable, ApplicationRef } from "@angular/core";
import { MediaMatcher } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';

@Injectable()
export class Globals {
    rutaApi: string = 'https://tranquil-inlet-16602.herokuapp.com/api';
    mobileSize: '600px';
    tempsNotificacions:number = 2000;
    buscador: string = '';
}