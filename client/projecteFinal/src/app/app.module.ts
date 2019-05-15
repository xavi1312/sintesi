import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BenvingudaComponent } from './components/benvinguda/benvinguda.component';
import { IniciSessioComponent } from './components/inici-sessio/inici-sessio.component';
import { RegistreComponent } from './components/registre/registre.component';

@NgModule({
  declarations: [
    AppComponent,
    BenvingudaComponent,
    IniciSessioComponent,
    RegistreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
