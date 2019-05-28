import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatTooltipModule} from '@angular/material/tooltip';

// Ruting
import { AppRoutingModule } from './app-routing.module';

// Serveis
import { AuditInterceptorService } from './serveis/interceptors/audit-interceptor.service';

// Components
import { AppComponent } from './app.component';
import { IniciSessioComponent } from './pagines/inici-sessio/inici-sessio.component';
import { RegistreComponent } from './pagines/registre/registre.component';
import { Globals } from './variablesGlobals';

//Angular Material Components
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    IniciSessioComponent,
    RegistreComponent
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
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule
  ],
  providers: [ Globals, {provide: HTTP_INTERCEPTORS, useClass: AuditInterceptorService, multi: true}  ],
  bootstrap: [AppComponent],
  entryComponents: [],
})
export class AppModule { }
