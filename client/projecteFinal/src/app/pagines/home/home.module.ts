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
import { Globals } from 'src/app/variablesGlobals';
import { HomeComponent } from './home/home.component';
import { EtiquetesComponent, DialogNovaEtiqueta } from './etiquetes/etiquetes.component';
import { EtiquetaComponent, DialogEditarEtiqueta } from '../../Components/etiqueta/etiqueta.component';
import { TasquesComponent } from './tasques/tasques.component';
import { TascaComponent } from 'src/app/Components/tasca/tasca.component';
import { BotoFixeBottomComponent } from 'src/app/Components/boto-fixe-bottom/boto-fixe-bottom.component';
import { HeaderComponent } from 'src/app/Components/header/header.component';

@NgModule({
  declarations: [
    HomeComponent,
    EtiquetesComponent,
    EtiquetaComponent,
    DialogEditarEtiqueta,
    DialogNovaEtiqueta,
    TasquesComponent,
    TascaComponent,
    BotoFixeBottomComponent,
    HeaderComponent,
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
  providers: [ Globals, {provide: HTTP_INTERCEPTORS, useClass: AuditInterceptorService, multi: true}  ],
})
export class HomeModule { }
