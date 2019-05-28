import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// DateTime picker
import { MatDatepickerModule, MatMomentDateModule } from '@coachcare/datepicker';

// Ruting
import { HomeRoutingModule } from './home-routing.module';

// Tinymce
import { EditorModule } from '@tinymce/tinymce-angular';

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
import { MatAutocompleteModule } from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';

// Serveis
import { AuditInterceptorService } from '../../serveis/interceptors/audit-interceptor.service';

// Components
import { Globals } from '../../variablesGlobals';
import { HomeComponent } from './home/home.component';
import { EtiquetesComponent, DialogNovaEtiqueta } from './etiquetes/etiquetes.component';
import { EtiquetaComponent, DialogEditarEtiqueta } from '../../Components/etiqueta/etiqueta.component';
import { TasquesComponent } from './tasques/tasques.component';
import { TascaComponent, DialogAlarma } from '../../Components/tasca/tasca.component';
import { BotoFixeBottomComponent } from '../../Components/boto-fixe-bottom/boto-fixe-bottom.component';
import { HeaderComponent } from '../../Components/header/header.component';
import { TascaLlistaComponent } from 'src/app/Components/tasca-llista/tasca-llista.component';
import { SelectAutocompletatComponent } from 'src/app/Components/select-autocompletat/select-autocompletat.component';

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
    TascaLlistaComponent,
    SelectAutocompletatComponent,
    DialogAlarma
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,

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
    MatListModule,
    MatAutocompleteModule,
    MatSnackBarModule,

    // Datetime picker
    MatDatepickerModule,
    MatMomentDateModule
  ],
  entryComponents: [EtiquetesComponent, DialogEditarEtiqueta, EtiquetaComponent, DialogNovaEtiqueta, TascaComponent, DialogAlarma],
  bootstrap: [DialogEditarEtiqueta, DialogNovaEtiqueta, DialogAlarma],
  providers: [ Globals, {provide: HTTP_INTERCEPTORS, useClass: AuditInterceptorService, multi: true}  ],
})
export class HomeModule { }
