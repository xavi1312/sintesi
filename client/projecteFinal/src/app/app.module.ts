import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BenvingudaComponent } from './components/benvinguda/benvinguda.component';
import { IniciSessioComponent } from './components/inici-sessio/inici-sessio.component';
import { RegistreComponent } from './components/registre/registre.component';
import { Globals } from './variablesGlobals';

//Angular Material Components
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { SidenavComponent } from './components/header/sidenav/sidenav.component';
import { NavComponent } from './components/header/nav/nav.component';
import { TascaComponent } from './components/tasca/tasca.component';
import { EtiquetesComponent } from './components/etiquetes/etiquetes.component';
import { EtiquetaComponent, DialogEditarEtiqueta } from './components/etiqueta/etiqueta.component';

@NgModule({
  declarations: [
    AppComponent,
    BenvingudaComponent,
    IniciSessioComponent,
    RegistreComponent,
    HomeComponent,
    SidenavComponent,
    NavComponent,
    TascaComponent,
    EtiquetesComponent,
    EtiquetaComponent,
    DialogEditarEtiqueta
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,

    BrowserAnimationsModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSortModule
  ],
  providers: [ Globals ],
  bootstrap: [AppComponent],
  entryComponents: [EtiquetesComponent, DialogEditarEtiqueta],
})
export class AppModule { }
