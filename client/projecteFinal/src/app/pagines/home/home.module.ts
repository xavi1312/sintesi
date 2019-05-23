import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Ruting
import { HomeRoutingModule } from './home-routing.module';

// components anngular material
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

// Serveis
import { AuditInterceptorService } from 'src/app/serveis/interceptors/audit-interceptor.service';

// Components
import { Globals, MediaQuerys } from 'src/app/variablesGlobals';
import { HomeComponent } from './home/home.component';
import { EtiquetesComponent, DialogNovaEtiqueta } from './etiquetes/etiquetes.component';
import { EtiquetaComponent, DialogEditarEtiqueta } from './etiquetes/etiqueta/etiqueta.component';

@NgModule({
  declarations: [
    HomeComponent,
    EtiquetesComponent,
    EtiquetaComponent,
    DialogEditarEtiqueta,
    DialogNovaEtiqueta
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    // Angular material
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatDialogModule,
    MatListModule
  ],
  entryComponents: [EtiquetesComponent, DialogEditarEtiqueta, EtiquetaComponent , DialogNovaEtiqueta],
  bootstrap: [DialogEditarEtiqueta, DialogNovaEtiqueta],
  providers: [ Globals, MediaQuerys ,{provide: HTTP_INTERCEPTORS, useClass: AuditInterceptorService, multi: true}  ],
})
export class HomeModule { }
